let tabs;
(async () => {
  tabs = await new Promise(function (resolve, reject) {
    try {
      chrome.runtime.sendMessage({ request: "getTabs" }, function ({ data }) {
        resolve(data);
      });
    } catch {
      reject();
    }
  });
  tabs = tabs.filter(function (tab) {
    return tab.url.search(/chrome:\/\/.*/) < 0;
  });
  console.log(tabs);
  let top = 30;
  for (let tab of tabs) {
    document.querySelector("#tablist").insertAdjacentHTML(
      "beforeend",
      `<div style="top: ${top}px;" class="tabitem">
	<input type="checkbox" ${!tab.autoDiscardable ? "checked" : ""} data-tab="${tab.id}">
    <img src="${tab.favIconUrl || "image-not-found.svg"}">
    <p>${tab.title}</p>
</div>`
    );
    top += 20;
  }
  let checkboxes = Array.from(document.querySelectorAll(".tabitem > input"));
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("change", function (e) {
      chrome.runtime.sendMessage({ request: "setDiscardable", tab: Number(e.currentTarget.dataset.tab), value: !e.currentTarget.checked }, null);
      document.querySelector("#all").checked = checkboxes.every(function (box) {
        return box.checked;
      });
    });
  }
  document.querySelector("#all").checked = tabs.every(function (tab) {
    return !tab.autoDiscardable;
  });
  document.querySelector("#all").onclick = function () {
    let checked = this.checked;
    for (let box of checkboxes) {
      box.checked = checked;
      box.dispatchEvent(new Event("change"));
    }
  };
})();

document.querySelector("#title").innerText = chrome.i18n.getMessage("manifest_name");
document.querySelector("#version").innerText = chrome.i18n.getMessage("version") + " " + chrome.runtime.getManifest().version;
document.querySelector("#help").innerText = chrome.i18n.getMessage("help");
document.querySelector("#alllabel").innerText = chrome.i18n.getMessage("select_all");
