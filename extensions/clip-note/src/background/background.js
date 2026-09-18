chrome.runtime.onInstalled.addListener(() => {
  console.log('ClipNote installed.');
  chrome.storage.sync.set({ isPremium: false, screenshotCount: 0 });
});
