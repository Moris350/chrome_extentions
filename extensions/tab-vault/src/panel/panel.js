import { isPremiumUser, getUpgradeUrl } from '../shared/license.js';

document.addEventListener('DOMContentLoaded', async () => {
  const currentTabsList = document.getElementById('current-tabs-list');
  const savedVaultsList = document.getElementById('saved-vaults-list');
  const saveAllBtn = document.getElementById('save-all-btn');
  const premiumStatus = document.getElementById('premium-status');
  const premiumOverlay = document.getElementById('premium-overlay');
  const autoSyncCb = document.getElementById('auto-sync-cb');
  const upgradeBtn = document.getElementById('upgrade-btn');

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

  // Load current tabs
  const renderCurrentTabs = async () => {
    try {
      currentTabsList.textContent = '';
      const tabs = await chrome.tabs.query({ currentWindow: true });
      tabs.forEach(tab => {
        const li = document.createElement('li');
        li.textContent = tab.title || tab.url;
        currentTabsList.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading current tabs:", err);
    }
  };
  await renderCurrentTabs();

  // Save all tabs
  saveAllBtn.addEventListener('click', async () => {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const tabsToSave = tabs.map(t => ({ title: t.title, url: t.url }));
      const vault = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        tabs: tabsToSave
      };

      const result = await chrome.storage.local.get(['vaults']);
      const vaults = result.vaults || [];
      
      // Prevent free users from saving more than 1 vault (Pricing loophole fix)
      if (!premium && vaults.length >= 1) {
        alert("Free users can only save 1 vault. Please upgrade to Premium!");
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
      
      vaults.forEach((v, index) => {
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = `Vault (${new Date(v.date).toLocaleString()}): ${v.tabs.length} tabs `;
        li.appendChild(titleSpan);

        // Restore Button
        const restoreBtn = document.createElement('button');
        restoreBtn.textContent = 'Restore';
        restoreBtn.style.marginRight = '5px';
        restoreBtn.addEventListener('click', () => {
          v.tabs.forEach(tab => {
            chrome.tabs.create({ url: tab.url, active: false });
          });
        });
        li.appendChild(restoreBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
          vaults.splice(index, 1);
          await chrome.storage.local.set({ vaults });
          renderSavedVaults();
        });
        li.appendChild(deleteBtn);

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
      alert("Auto-sync is a Premium feature.");
    } else {
      // Implement auto-sync logic here
      console.log("Auto-sync toggled:", e.target.checked);
    }
  });
});
