const ClipNoteLicense = {
  FREE: {
    textNotes: 'unlimited',
    screenshots: 15
  },
  PREMIUM: {
    price: '$1.99/mo',
    features: ['Notion Sync', 'Unlimited Screenshots']
  },
  async checkPremiumStatus() {
    const data = await chrome.storage.sync.get('isPremium');
    return data.isPremium || false;
  }
};
