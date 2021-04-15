chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.update(tab.id, { autoDiscardable: false });
});

chrome.tabs.onReplaced.addListener(function (tabId) {
  chrome.tabs.update(tabId, { autoDiscardable: false });
});

chrome.runtime.onInstalled.addListener(function (details) {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.tabs.update(tab.id, { autoDiscardable: false });
    });
  });
});

chrome.runtime.setUninstallURL("https://chrome.google.com/webstore/detail/dnhngfnfolbmhgealdpolmhimnoliiok/support");

chrome.contextMenus.create({
  id: "review",
  title: "🌟 " + chrome.i18n.getMessage("cm_review"),
  contexts: ["browser_action"],
});

chrome.contextMenus.create({
  id: "support",
  title: "💬 " + chrome.i18n.getMessage("cm_support"),
  contexts: ["browser_action"],
});

chrome.contextMenus.create({
  id: "help",
  title: "❓ " + chrome.i18n.getMessage("cm_help"),
  contexts: ["browser_action"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  switch (info.menuItemId) {
    case "review":
      chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/dnhngfnfolbmhgealdpolmhimnoliiok/reviews" });
      break;
    case "support":
      chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/dnhngfnfolbmhgealdpolmhimnoliiok/support" });
      break;
    case "help":
      chrome.tabs.create({ url: "https://github.com/WorldLanguages/DoNotDiscard/issues" });
      break;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.request) {
    case "getTabs":
      chrome.tabs.query({}, function (tabs) {
        sendResponse({ data: tabs });
      });
      break;
    case "setDiscardable":
      chrome.tabs.update(request.tab, { autoDiscardable: request.value });
      break;
    default:
      break;
  }
  return true;
});
