chrome.runtime.onInstalled.addListener(() => {
  console.log('ClipNote installed.');
  chrome.storage.sync.set({ isPremium: false, screenshotCount: 0 });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisibleTab') {
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
      sendResponse({dataUrl});
    });
    return true;
  }
});
