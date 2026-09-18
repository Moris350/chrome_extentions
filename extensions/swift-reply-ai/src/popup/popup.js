document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('status-text');
  const usageText = document.getElementById('usage-text');
  const upgradeSection = document.getElementById('upgrade-section');
  const premiumSection = document.getElementById('premium-section');
  
  const status = await getLicenseStatus();
  
  if (status.isPremium) {
    statusText.innerText = 'Premium';
    statusText.style.color = '#34a853';
    usageText.innerText = 'Unlimited replies';
    upgradeSection.classList.add('hidden');
    premiumSection.classList.remove('hidden');
  } else {
    statusText.innerText = 'Free Tier';
    usageText.innerText = `${status.usageCount} / ${status.freeLimit} replies used today`;
    upgradeSection.classList.remove('hidden');
    premiumSection.classList.add('hidden');
  }
  
  document.getElementById('upgrade-btn').addEventListener('click', () => {
    // Handle upgrade process
    chrome.storage.local.set({ isPremium: true }, () => {
      alert('Upgraded to Premium!');
      window.close();
    });
  });
  
  document.getElementById('reset-btn').addEventListener('click', () => {
    // Handle reset process for testing
    chrome.storage.local.set({ isPremium: false, usageCount: 0 }, () => {
      alert('Reset to Free Tier!');
      window.close();
    });
  });
});
