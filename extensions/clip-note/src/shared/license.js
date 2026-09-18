const ClipNoteLicense = {
  FREE: {
    textNotes: 'unlimited',
    screenshots: 15
  },
  PREMIUM: {
    price: '$2',
    features: ['Notion Sync', 'Unlimited Screenshots']
  },
  async checkPremiumStatus() {
    const data = await chrome.storage.sync.get('isPremium');
    return data.isPremium || false;
  }
};
