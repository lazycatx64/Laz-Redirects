
console.log( "[LazRedirect][Background] Background script!" );

chrome.browserAction.setBadgeText({ text: 'nom' });

chrome.browserAction.onClicked.addListener( function( tab ) {

    chrome.tabs.executeScript( tab.id, {
        file: "script.js"
    });

});

chrome.runtime.onMessage.addListener( function ( message, sender, sendResponse ) {

    chrome.browserAction.setBadgeText({ 
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