

var curTab = window.location.href
console.log( "[LazRedirect][Script] current url = " + curTab )

// chrome.runtime.sendMessage({ badgeText: '42' })

var kemonoUrl = "https://kemono.su"

var fantiaFanclubUrl = /https?:\/\/fantia\.jp\/fanclubs/
var fantiaPostUrl = /https?:\/\/fantia\.jp\/posts\/\d+/


function openInNewTab( url ) {

    var stackTrace = new Error().stack.split("\n");
    var callerLine = stackTrace[2].trim(); // 获取调用行
    console.log("[LazRedirect][Script] Opening Url: " + url);
    console.log("[LazRedirect][Script] Called from: " + callerLine);
    window.open( url, "_blank" )

}


function searchFantiaDiv() {
    
    var divElements = document.querySelectorAll( "div" )

    for ( var i = 0; i < divElements.length; i++ ) {
        var divText = divElements[i].textContent || divElements[i].innerText

        var fanclubs = divText.match( fantiaFanclubUrl )
        if ( fanclubs ) {

            var fanclubId = fanclubs[0].match(/\d+/)
            fanclubId = kemonoUrl + "/fantia/user/" + fanclubId
            openInNewTab( fanclubId )
            break
        }
        
        var posts = divText.match( fantiaPostUrl )
        if ( posts ) {

            openInNewTab( posts[0] )
            break
        }
    }
    
}

function searchFantiaLinkFull() {
    
    var userLink = document.querySelector( "a[href*='fantia.jp/fanclubs']" )
    if ( userLink ) {
        var match = userLink.href.match( /\d+/ ) 
        if ( match && match.length > 0 ) {
            var userId = match[0]
            var newUrl = kemonoUrl + "/fantia/user/" + userId

            openInNewTab( newUrl )
        }
    }
    
}

function searchFanboxLink() {
    
    var userLink = document.querySelector( "a[href^='/users/'], a[href^='/en/users/']" )
    if ( userLink ) {
        var match = userLink.href.match( /\d+/ ) 
        if ( match && match.length > 0 ) {
            var userId = match[0]
            var newUrl = kemonoUrl + "/fanbox/user/" + userId

            openInNewTab( newUrl )
        }
    }
}

function searchFanboxLinkFull() {
    
    var userLink = document.querySelector( "a[href^='https://www.pixiv.net/users/']" )
    if ( userLink ) {
        var match = userLink.href.match( /\d+/ ) 
        if ( match && match.length > 0 ) {
            var userId = match[0]
            var newUrl = kemonoUrl + "/fanbox/user/" + userId

            openInNewTab( newUrl )
        }
    }
}

function searchDLSite() {
    
    var match = curTab.match( /RG\d+/ )
    if ( match && match.length > 0 ) {
        var circleId = match[0]
        var newUrl = kemonoUrl + "/dlsite/user/" + circleId

        openInNewTab( newUrl )
    }

}

////////// Pixiv to kemono //////////
if ( curTab.match( /pixiv\.net(\/en|)\/users/ ) || curTab.match( /pixiv\.net(\/en|)\/artworks/ ) ) {
    
    console.log( "[LazRedirect][Script] matched pixiv" )

    searchFantiaDiv()
    searchFanboxLink()
} 

////////// Fanbox to kemono //////////
if ( curTab.match( /\S+\.fanbox\.cc/ ) ) {
    
    console.log( "[LazRedirect][Script] matched fanbox" )

    searchFantiaLinkFull()
    searchFanboxLinkFull()

} 


////////// DLsite circle to kemono //////////
if ( curTab.match( /dlsite\.com\/.*\/maker_id\/RG\d+/ ) ) {

    console.log( "[LazRedirect][Script] matched dlsite" )

    searchDLSite()

} 

////////// Patreon to kemono //////////
if ( curTab.match( /patreon\.com\/\S+/ ) ) {

    console.log( "[LazRedirect][Script] matched patreon" )
    
    // var match = curTab.match( /\d+/)
    // if ( match && match.length > 0 ) {
    //     var userId = match[0]
    //     var newUrl = kemonoUrl + "/patreon/user/" + userId

    //     openInNewTab( newUrl )
    // }

    var match = document.querySelector( 'script#__NEXT_DATA__' ).innerText.match( /\/api\/user\/(\d+)/ )
    if ( match && match.length > 0 ) {
        var userId = match[1]
        var newUrl = kemonoUrl + "/patreon/user/" + userId
        
        openInNewTab( newUrl )

    }

} 

////////// Fantia to Pixiv //////////
if ( curTab.match( /fantia\.jp\/(fanclubs|posts)\/\d+/ ) || curTab.match( /fantia\.jp\/\S+(\/|)/ ) ) {
    
    console.log( "[LazRedirect][Script] matched fantia" )

    var userLink = document.querySelector( "a[href^='/fanclubs/']" )
    if ( userLink ) {
        var match = userLink.href.match( /\d+/ )
        if ( match && match.length > 0 ) {
            var userId = match[0]
            var newUrl = kemonoUrl + "/fantia/user/" + userId

            openInNewTab( newUrl )
        }
    }



} 

////////// Facebook user to post search //////////
if ( curTab.match( /facebook\.com/ ) ) {
    
    console.log( "[LazRedirect][Script] matched facebook" )

    var userLink = document.querySelector( "a[href^='/photo/?fbid=']" )
    if ( userLink ) {
        var match = userLink.href.match( /ecnf.(\d+)/ )
        if ( match && match.length > 1 ) {
            var userId = match[1]
            var newUrl = "https://facebook.com/profile/" + userId + "/search/?q=."

            openInNewTab( newUrl )
        }
    }



} 



