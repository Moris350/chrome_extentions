// Freemium logic
const PREMIUM_PRICE = "$1";

export async function isPremiumUser() {
  // Check premium status via backend API / local cache
  try {
    const result = await chrome.storage.local.get(['isPremium']);
    return result.isPremium === true;
  } catch (error) {
    console.error("Error fetching premium status:", error);
    return false;
  }
}

export function getUpgradeUrl() {
  return "https://tabvault.example.com/pricing";
}
