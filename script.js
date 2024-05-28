

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


function searchGelDiv() {
    
    const liElem = document.querySelector( '.tag-type-artist' )
    if (!liElem)
        return

    const aElem = liElem.querySelectorAll('a')
    if (!aElem)
        return

    const artist = aElem[1].innerText

    openInNewTab( 'https://danbooru.donmai.us/artists?commit=Search&search[any_name_matches]=' + artist )

}
function searchDanWiki() {
    // document.querySelector( 'div[id^=c-artists]' ).querySelector( 'a' ).innerText
    const divElem = document.querySelector( 'div[id^=c-artists]' )
    if (!divElem)
        return

    const aElem = divElem.querySelector('a')
    if (!aElem)
        return

    const artist = aElem.innerText.replace( ' ', '_' )

    openInNewTab( 'https://gelbooru.com/index.php?page=post&s=list&tags=' + artist )

}

function searchFantiaDiv() {
    
    var divElements = document.querySelectorAll( "div" )

    for ( var i = 0; i < divElements.length; i++ ) {
        var divText = divElements[i].innerText

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

    const divElem = document.querySelector('div[style*="fanbox/public/images/user"')
    if (!divElem || !divElem.style)
        return

    const bgImageUrl = divElem.style['backgroundImage']
    
    var match = bgImageUrl.match( /fanbox\/public\/images\/user\/(\d+)\// )
    if (!match || match.length < 1)
        return
    
    var userId = match[1]
    openInNewTab( kemonoUrl + "/fanbox/user/" + userId )
    
}

function searchDLSite() {
    
    var match = curTab.match( /RG\d+/ )
    if ( match && match.length > 0 ) {
        var circleId = match[0]
        var newUrl = kemonoUrl + "/dlsite/user/" + circleId

        openInNewTab( newUrl )
    }

}

function searchMisskey() {
    // https://misskey.art/@meis12495@misskey.io
    var match = curTab.match( /misskey\.io\/@(\S+)(\/|$)/ )
    if ( match && match.length > 0 ) {
        var userName = match[1]
        
        openInNewTab( 'https://misskey.art/@' + userName + '@misskey.io' )
    }

}

////////// misskey.io to misskey.art //////////
if ( curTab.match( /misskey\.io\/@.*/ ) ) {
    
    console.log( "[LazRedirect][Script] matched misskey.io" )

    searchMisskey()
} 

////////// Gel to Danbooru wiki //////////
if ( curTab.match( /gelbooru\.com\/index\.php\?page=post.*&id=(\d+)/ ) ) {
    
    console.log( "[LazRedirect][Script] matched gelbooru" )

    searchGelDiv()
} 

////////// Dan to gel search //////////
if ( curTab.match( /danbooru\.donmai\.us\/artists\/(\d+)/ ) ) {
    
    console.log( "[LazRedirect][Script] matched danbooru artist wiki" )

    searchDanWiki()
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
    
    console.log( "[LazRedirect][Script] matched facebook: " + curTab )


    // 社團成員
    if ( curTab.match( /facebook\.com\/groups\/\d+\/user\/\d+/ ) ) {
        console.log( "[LazRedirect][Script] group user /facebook\.com\/groups\/\d+\/user\/d+/" )

        var userId = curTab.match( /groups\/\d+\/user\/(\d+)/ )[1]
        if ( userId && userId.length > 1 ) {
            
            var newUrl = "https://facebook.com/profile/" + userId + "/search/?q=檢舉"

            openInNewTab( newUrl )
        }

    } else if ( curTab.match( /facebook\.com\/profile\.php\?id/ ) ) {
        console.log( "[LazRedirect][Script] /facebook\.com\/profile\.php\?id/" )
    
        var userId = curTab.match( /profile\.php\?id\=(\d+)/ )[1]
        if ( userId && userId.length > 1 ) {
            
            var newUrl = "https://facebook.com/profile/" + userId + "/search/?q=檢舉"

            openInNewTab( newUrl )
        }

    } else if ( curTab.match( /facebook\.com\/[a-zA-Z0-9_\.]+$/ ) ) {
        console.log( "[LazRedirect][Script] /facebook\.com\/[a-zA-Z0-9_\.]+$/" )
        var userId = curTab.match( /facebook\.com\/([a-zA-Z0-9_\.]+)$/ )[1]
        if ( userId && userId.length > 1 ) {
            
            var newUrl = "https://facebook.com/profile/" + userId + "/search/?q=檢舉"

            openInNewTab( newUrl )
        }

    } else {
        var userLink = document.querySelector( "a[href^='/photo/?fbid=']" )
        console.log( "[LazRedirect][Script] a[href^='/photo/?fbid=']" )
        if ( userLink ) {
            var match = userLink.href.match( /ecnf.(\d+)/ )
            if ( match && match.length > 1 ) {
                var userId = match[1]
                var newUrl = "https://facebook.com/profile/" + userId + "/search/?q=檢舉"
    
                openInNewTab( newUrl )
            }
        }

    }
} 



