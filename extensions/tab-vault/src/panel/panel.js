import { isPremiumUser, getUpgradeUrl } from '../shared/license.js';

document.addEventListener('DOMContentLoaded', async () => {
  const currentTabsList = document.getElementById('current-tabs-list');
  const savedVaultsList = document.getElementById('saved-vaults-list');
  const saveBtn = document.getElementById('save-all-btn');
  const premiumStatus = document.getElementById('premium-status');
  const premiumOverlay = document.getElementById('premium-overlay');
  const autoSyncCb = document.getElementById('auto-sync-cb');
  const upgradeBtn = document.getElementById('upgrade-btn');

  let activeTabs = [];

  // Check premium status
  const premium = await isPremiumUser();
  if (premium) {
    premiumStatus.textContent = 'Premium';
    premiumStatus.classList.add('premium');
    premiumOverlay.classList.add('hidden');
    autoSyncCb.disabled = false;
  } else {
    premiumStatus.textContent = 'Free User';
  }

  upgradeBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: getUpgradeUrl() });
  });

  // Load current tabs with checkboxes
  const renderCurrentTabs = async () => {
    try {
      currentTabsList.textContent = '';
      activeTabs = await chrome.tabs.query({ currentWindow: true });
      activeTabs.forEach((tab, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '5px';
        
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = true;
        cb.dataset.index = index;
        cb.style.marginRight = '8px';
        
        const span = document.createElement('span');
        span.textContent = tab.title || tab.url;
        span.style.overflow = 'hidden';
        span.style.textOverflow = 'ellipsis';
        span.style.whiteSpace = 'nowrap';
        span.style.maxWidth = '250px';

        li.appendChild(cb);
        li.appendChild(span);
        currentTabsList.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading current tabs:", err);
    }
  };
  await renderCurrentTabs();

  // Auto-refresh tabs list when tabs are opened, closed, or updated
  chrome.tabs.onCreated.addListener(() => renderCurrentTabs());
  chrome.tabs.onRemoved.addListener(() => renderCurrentTabs());
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.title || changeInfo.url) renderCurrentTabs();
  });

  const selectAllCb = document.getElementById('select-all-cb');
  if (selectAllCb) {
    selectAllCb.addEventListener('change', (e) => {
      const checkboxes = currentTabsList.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        cb.checked = e.target.checked;
      });
    });
  }

  // Save SELECTED tabs
  saveBtn.addEventListener('click', async () => {
    try {
      const checkboxes = currentTabsList.querySelectorAll('input[type="checkbox"]:checked');
      if (checkboxes.length === 0) {
        alert("Please select at least one tab to save.");
        return;
      }

      const tabsToSave = [];
      checkboxes.forEach(cb => {
        const tab = activeTabs[cb.dataset.index];
        tabsToSave.push({ title: tab.title, url: tab.url });
      });

      const vault = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        tabs: tabsToSave
      };

      // Get all existing keys to enforce limits
      const allItems = await chrome.storage.local.get(null);
      let vaultKeys = Object.keys(allItems).filter(k => k.startsWith('vault_'));
      
      // Limit free users to 3 vaults
      if (!premium && vaultKeys.length >= 3) {
        alert("Free users can only save up to 3 vaults. Please upgrade to Premium!");
        return;
      }

      // Limit tabs per vault for free users
      if (!premium && tabsToSave.length > 50) {
        alert("Free users can only save up to 50 tabs per vault. Please upgrade to Premium!");
        return;
      }

      const vaultId = Date.now().toString();
      const vault = {
        id: vaultId,
        date: new Date().toISOString(),
        tabs: tabsToSave
      };

      await chrome.storage.local.set({ [`vault_${vaultId}`]: vault });
      renderSavedVaults();
    } catch (err) {
      console.error("Error saving tabs:", err);
    }
  });

  async function renderSavedVaults() {
    try {
      // Storage Migration: if old array exists, move it to individual keys
      const oldResult = await chrome.storage.local.get(['vaults']);
      if (oldResult.vaults && Array.isArray(oldResult.vaults)) {
        const toSet = {};
        oldResult.vaults.forEach(v => {
          if(v.id) toSet[`vault_${v.id}`] = v;
        });
        await chrome.storage.local.set(toSet);
        await chrome.storage.local.remove('vaults');
      }

      const allItems = await chrome.storage.local.get(null);
      let vaults = Object.keys(allItems)
        .filter(k => k.startsWith('vault_'))
        .map(k => allItems[k])
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      savedVaultsList.textContent = '';
      if (vaults.length > 100) vaults = vaults.slice(0, 100);

      const searchInput = document.getElementById('search-vaults-input');
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      if (query) {
        vaults = vaults.filter(v => {
          const dateStr = new Date(v.date).toLocaleString().toLowerCase();
          if (dateStr.includes(query)) return true;
          return v.tabs.some(t => 
            (t.title && t.title.toLowerCase().includes(query)) || 
            (t.url && t.url.toLowerCase().includes(query))
          );
        });
      }
      
      if (vaults.length === 0) {
        savedVaultsList.innerHTML = `<div style="text-align: center; padding: 20px; color: #64748b;">
          <svg style="width: 48px; height: 48px; margin-bottom: 10px; color: #94a3b8;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <p style="margin: 0;">No saved vaults found.</p>
        </div>`;
        return;
      }

      vaults.forEach((v, index) => {
        const isLocked = !premium && index >= 3;

        const li = document.createElement('li');
        li.style.marginBottom = '12px';
        li.style.padding = '10px';
        li.style.backgroundColor = isLocked ? '#f1f5f9' : '#f8fafc';
        li.style.borderRadius = '8px';
        li.style.border = '1px solid #e2e8f0';
        li.style.opacity = isLocked ? '0.6' : '1';
        
        const titleDiv = document.createElement('div');
        titleDiv.textContent = `Vault (${new Date(v.date).toLocaleString()}) - ${v.tabs.length} tabs${isLocked ? ' 🔒 (Premium)' : ''}`;
        titleDiv.style.fontWeight = 'bold';
        titleDiv.style.marginBottom = '8px';
        li.appendChild(titleDiv);

        const btnContainer = document.createElement('div');
        
        // Restore Button
        const restoreBtn = document.createElement('button');
        restoreBtn.textContent = 'Restore';
        restoreBtn.style.marginRight = '8px';
        restoreBtn.style.cursor = isLocked ? 'not-allowed' : 'pointer';
        restoreBtn.style.backgroundColor = isLocked ? '#94a3b8' : '#334155';
        restoreBtn.style.color = 'white';
        restoreBtn.style.border = 'none';
        restoreBtn.disabled = isLocked;
        if (!isLocked) {
          restoreBtn.addEventListener('click', () => {
            v.tabs.forEach(tab => {
              chrome.tabs.create({ url: tab.url, active: false });
            });
          });
        }
        btnContainer.appendChild(restoreBtn);

        // Copy Links Button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy Links';
        copyBtn.style.marginRight = '8px';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.backgroundColor = 'transparent';
        copyBtn.style.color = '#3b82f6';
        copyBtn.style.border = '1px solid #93c5fd';
        copyBtn.addEventListener('click', async () => {
          const linksText = v.tabs.map(t => `${t.title || 'Untitled'}\n${t.url}`).join('\n\n');
          try {
            await navigator.clipboard.writeText(linksText);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = originalText;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy links:', err);
            alert('Failed to copy links.');
          }
        });
        btnContainer.appendChild(copyBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.backgroundColor = 'transparent';
        deleteBtn.style.color = '#ef4444';
        deleteBtn.style.border = '1px solid #fca5a5';
        deleteBtn.addEventListener('click', async () => {
          if(confirm('Are you sure you want to delete this vault?')) {
            vaults.splice(index, 1);
            await chrome.storage.local.set({ vaults });
            renderSavedVaults();
          }
        });
        btnContainer.appendChild(deleteBtn);

        li.appendChild(btnContainer);
        savedVaultsList.appendChild(li);
      });
    } catch (err) {
      console.error("Error rendering saved vaults:", err);
    }
  }

  renderSavedVaults();
  
  const searchInput = document.getElementById('search-vaults-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderSavedVaults();
      }, 300);
    });
  }
  
  // Enforce premium on auto-sync feature
  autoSyncCb.addEventListener('change', async (e) => {
    const isPrem = await isPremiumUser();
    if (!isPrem) {
      e.target.checked = false;
      alert("RAM Optimization is a Premium feature.");
    } else {
      console.log("RAM Optimization toggled:", e.target.checked);
    }
  });

  // Export functionality
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      const result = await chrome.storage.local.get(['vaults']);
      const vaults = result.vaults || [];
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vaults, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "tabvault-export.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  }

  // Import functionality
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => {
      importFile.click();
    });
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const importedVaults = JSON.parse(event.target.result);
          if (Array.isArray(importedVaults)) {
            const result = await chrome.storage.local.get(['vaults']);
            let vaults = result.vaults || [];
            vaults = vaults.concat(importedVaults);
            if (vaults.length > 100) vaults = vaults.slice(0, 100);
            await chrome.storage.local.set({ vaults });
            renderSavedVaults();
            alert('Vaults imported successfully!');
          }
        } catch (err) {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    });
  }
});
