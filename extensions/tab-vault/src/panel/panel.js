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

      const result = await chrome.storage.local.get(['vaults']);
      const vaults = result.vaults || [];
      
      // Limit free users to 3 vaults
      if (!premium && vaults.length >= 3) {
        alert("Free users can only save up to 3 vaults. Please upgrade to Premium!");
        return;
      }

      vaults.push(vault);
      await chrome.storage.local.set({ vaults });
      renderSavedVaults();
    } catch (err) {
      console.error("Error saving tabs:", err);
    }
  });

  async function renderSavedVaults() {
    try {
      const result = await chrome.storage.local.get(['vaults']);
      savedVaultsList.textContent = '';
      const vaults = result.vaults || [];
      
      if (vaults.length === 0) {
        savedVaultsList.innerHTML = `<div style="text-align: center; padding: 20px; color: #64748b;">
          <svg style="width: 48px; height: 48px; margin-bottom: 10px; color: #94a3b8;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <p style="margin: 0;">No saved vaults yet. Create your first vault!</p>
        </div>`;
        return;
      }

      vaults.forEach((v, index) => {
        const li = document.createElement('li');
        li.style.marginBottom = '12px';
        li.style.padding = '10px';
        li.style.backgroundColor = '#f8fafc';
        li.style.borderRadius = '8px';
        li.style.border = '1px solid #e2e8f0';
        
        const titleDiv = document.createElement('div');
        titleDiv.textContent = `Vault (${new Date(v.date).toLocaleString()}) - ${v.tabs.length} tabs`;
        titleDiv.style.fontWeight = 'bold';
        titleDiv.style.marginBottom = '8px';
        li.appendChild(titleDiv);

        const btnContainer = document.createElement('div');
        
        // Restore Button
        const restoreBtn = document.createElement('button');
        restoreBtn.textContent = 'Restore';
        restoreBtn.style.marginRight = '8px';
        restoreBtn.style.cursor = 'pointer';
        restoreBtn.style.backgroundColor = '#334155';
        restoreBtn.style.color = 'white';
        restoreBtn.style.border = 'none';
        restoreBtn.addEventListener('click', () => {
          v.tabs.forEach(tab => {
            chrome.tabs.create({ url: tab.url, active: false });
          });
        });
        btnContainer.appendChild(restoreBtn);

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
});
