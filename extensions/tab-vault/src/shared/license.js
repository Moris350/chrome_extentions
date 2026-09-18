// Freemium logic
const PREMIUM_PRICE = "$1.99/mo";

export async function isPremiumUser() {
  // Mock function to check premium status
  // In a real scenario, this would verify a token or license key via backend API
  return new Promise((resolve) => {
    chrome.storage.local.get(['isPremium'], (result) => {
      resolve(result.isPremium === true);
    });
  });
}

export function getUpgradeUrl() {
  return "https://tabvault.example.com/pricing";
}
