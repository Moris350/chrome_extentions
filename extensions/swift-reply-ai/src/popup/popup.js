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
  
  document.getElementById('upgrade-btn').addEventListener('click', async () => {
    // Handle upgrade process
    await setPremiumStatus(true);
    alert('Upgraded to Premium!');
    window.close();
  });
  
  document.getElementById('reset-btn').addEventListener('click', async () => {
    // Handle reset process for testing
    await resetUsage();
    alert('Reset to Free Tier!');
    window.close();
  });

  const customToneInput = document.getElementById('custom-tone-input');
  chrome.storage.local.get(['customTone'], (result) => {
    if (result.customTone) {
      customToneInput.value = result.customTone;
    }
  });

  document.getElementById('save-tone-btn').addEventListener('click', () => {
    let tone = customToneInput.value;
    
    // Sanitize and limit length
    tone = tone.substring(0, 100); 
    tone = tone.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    chrome.storage.local.set({ customTone: tone }, () => {
      alert('Custom tone saved!');
    });
  });
});
