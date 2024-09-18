
console.log( "[LazRedirect][Background] Background script!" );

chrome.action.setBadgeText({ text: 'laz' });

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['script.js']
    });
});

chrome.runtime.onMessage.addListener( function ( message, sender, sendResponse ) {

    chrome.action.setBadgeText({ 
        text: message.badgeText 
    });

});

// Page update status test
chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {

    console.log( "[LazRedirect][Background] Page status: " + changeInfo.status )

    if ( changeInfo.status === 'complete' ) {
        console.log( "[LazRedirect][Background] Page loaded completely: " + tab.url );
    }

});