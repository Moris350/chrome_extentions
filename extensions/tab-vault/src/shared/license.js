// Freemium logic
const PREMIUM_PRICE = "$1.99/mo";

export async function isPremiumUser() {
  // Check premium status via backend API / local cache
  return new Promise((resolve) => {
    chrome.storage.local.get(['isPremium'], (result) => {
      resolve(result.isPremium === true);
    });
  });
}

export function getUpgradeUrl() {
  return "https://tabvault.example.com/pricing";
}
