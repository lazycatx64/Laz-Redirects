
console.log("[Laz][Background] Background script!");

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("[Laz][Background] Clicked!");
    
    chrome.tabs.executeScript(tab.id, {
        file: "script.js"
    });
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // 更新图标标记
    chrome.browserAction.setBadgeText({ text: message.badgeText });
});