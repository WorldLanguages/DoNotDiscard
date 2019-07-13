chrome.tabs.onCreated.addListener(function(tab) {
  if(tab.status === "complete") chrome.tabs.reload(tab.id);
  chrome.tabs.update(tab.id, {autoDiscardable: false});
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.update(tab.id, {autoDiscardable: false});
    });
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.discarded) chrome.tabs.reload(tabId);
});
