
console.log("[Laz][Background] Background script!");

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("[Laz][Background] Clicked!"); 
    
    chrome.tabs.executeScript(tab.id, {
        code: `
            var links = document.querySelectorAll("a[href^='/users/'], a[href^='/en/users/']");
            console.log("[Laz][Content] links:");
            console.log(links);
            links.forEach(function (link) {
                var newURL = link.href.replace(/pixiv\.net/g, "kemono.party");
                link.href = newURL;
                console.log("[Laz][Content] Link updated:", newURL);
            });
        `
    });
});
