updateurls(); setInterval(updateurls, 10000);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(urls.length === 0) return;
  if(changeInfo.url) {
    chrome.tabs.query({url: urls}, function(tabs) {
      if(tabs === undefined) {
        updateurls();
        chrome.browserAction.setBadgeText({text: "error"});
        return;
      }
      chrome.browserAction.setBadgeText({text: ""});
      if(tabs.length === 0 && !(tab.autoDiscardable)) {
        chrome.tabs.update(tabId, {autoDiscardable: true});
      }
      if(tabs.length !== 0) {
      for (i = 0; i < tabs.length; i++) {
        if(tabs[i].id === tabId) {
          if(tab.autoDiscardable)  // If tab matches URL pattern and it should be marked as non discardable
          chrome.tabs.update(tabId, {autoDiscardable: false});
          break;
        }
        if(i === tabs.length-1 && !(tab.autoDiscardable))  // If tab does not match URL pattern and should be marked as discardable
        chrome.tabs.update(tabId, {autoDiscardable: true});
      } // Loop
    } // If tabs found
    });
  }
});

function updateurls() {
  if(localStorage.getItem("urls")) urls = localStorage.getItem("urls").split(',');
  else urls = [];
}
