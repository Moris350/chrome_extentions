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
    premiumStatus.textContent = 'Premium 👑';
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
  const tabs = await chrome.tabs.query({ currentWindow: true });
  tabs.forEach(tab => {
    const li = document.createElement('li');
    li.textContent = tab.title || tab.url;
    currentTabsList.appendChild(li);
  });

  // Save all tabs
  saveAllBtn.addEventListener('click', async () => {
    const tabsToSave = tabs.map(t => ({ title: t.title, url: t.url }));
    const vault = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      tabs: tabsToSave
    };

    chrome.storage.local.get(['vaults'], (result) => {
      const vaults = result.vaults || [];
      vaults.push(vault);
      chrome.storage.local.set({ vaults }, () => {
        renderSavedVaults();
      });
    });
  });

  function renderSavedVaults() {
    chrome.storage.local.get(['vaults'], (result) => {
      savedVaultsList.innerHTML = '';
      const vaults = result.vaults || [];
      vaults.forEach(v => {
        const li = document.createElement('li');
        li.textContent = `Vault (${new Date(v.date).toLocaleString()}): ${v.tabs.length} tabs`;
        savedVaultsList.appendChild(li);
      });
    });
  }

  renderSavedVaults();
});
