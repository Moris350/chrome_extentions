// Freemium Logic
const FREE_LIMIT = 5;
const PREMIUM_PRICE = "$2.99/mo";

async function getLicenseStatus() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['isPremium', 'usageCount', 'lastDate'], (result) => {
      const today = new Date().toDateString();
      let usageCount = result.usageCount || 0;
      let lastDate = result.lastDate || today;

      if (lastDate !== today) {
        usageCount = 0;
        lastDate = today;
        chrome.storage.local.set({ usageCount, lastDate });
      }

      resolve({
        isPremium: result.isPremium || false,
        usageCount,
        freeLimit: FREE_LIMIT,
        canUse: result.isPremium || usageCount < FREE_LIMIT,
        premiumPrice: PREMIUM_PRICE
      });
    });
  });
}

async function incrementUsage() {
  const status = await getLicenseStatus();
  if (!status.isPremium) {
    chrome.storage.local.set({ usageCount: status.usageCount + 1 });
  }
}
