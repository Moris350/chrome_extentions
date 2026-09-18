// Freemium Logic
const FREE_LIMIT = 5;
const PREMIUM_PRICE = "$1";

// Tamper-resistant signature to prevent manual storage edits
async function generateSignature(usage, date, premium) {
  const msgUint8 = new TextEncoder().encode(`swift_${usage}_${date}_${premium}_secret`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getLicenseStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['isPremium', 'usageCount', 'lastDate', 'sig'], async (result) => {
      const today = new Date().toDateString();
      let usageCount = result.usageCount || 0;
      let lastDate = result.lastDate || today;
      let isPremium = result.isPremium || false;
      let sig = result.sig || '';

      // Validate signature to prevent tampering
      if (result.usageCount !== undefined) {
        const expectedSig = await generateSignature(usageCount, lastDate, isPremium);
        if (sig !== expectedSig) {
          usageCount = FREE_LIMIT; // lock out if tampered
          isPremium = false;
        }
      }

      if (lastDate !== today) {
        usageCount = 0;
        lastDate = today;
        const newSig = await generateSignature(usageCount, lastDate, isPremium);
        chrome.storage.sync.set({ usageCount, lastDate, sig: newSig });
      }

      resolve({
        isPremium,
        usageCount,
        freeLimit: FREE_LIMIT,
        canUse: isPremium || usageCount < FREE_LIMIT,
        premiumPrice: PREMIUM_PRICE
      });
    });
  });
}

async function incrementUsage() {
  const status = await getLicenseStatus();
  if (!status.isPremium) {
    const newCount = status.usageCount + 1;
    const today = new Date().toDateString();
    const sig = await generateSignature(newCount, today, status.isPremium);
    chrome.storage.sync.set({ usageCount: newCount, lastDate: today, sig });
  }
}

async function setPremiumStatus(isPremium) {
  const status = await getLicenseStatus();
  const today = new Date().toDateString();
  const usageCount = status.usageCount;
  const sig = await generateSignature(usageCount, today, isPremium);
  return new Promise(resolve => {
    chrome.storage.sync.set({ isPremium, usageCount, lastDate: today, sig }, resolve);
  });
}

async function resetUsage() {
  const today = new Date().toDateString();
  const sig = await generateSignature(0, today, false);
  return new Promise(resolve => {
    chrome.storage.sync.set({ isPremium: false, usageCount: 0, lastDate: today, sig }, resolve);
  });
}
