
var manifestData = chrome.runtime.getManifest();
console.log( "[LazRedirect][Script] Current Version = ", manifestData.version )

var curTab = window.location.href
console.log( "[LazRedirect][Script] current url = " + curTab )

// chrome.runtime.sendMessage({ badgeText: '42' })

var kemonoUrl = "https://kemono.su"

var fantiaFanclubUrl = /https?:\/\/fantia\.jp\/fanclubs/
var fantiaPostUrl = /https?:\/\/fantia\.jp\/posts\/\d+/


function openInNewTab( url ) {

    let stackTrace = new Error().stack.split("\n");
    let callerLine = stackTrace[2].trim(); // 获取调用行
    console.log("[LazRedirect][Script] Opening Url: " + url);
    console.log("[LazRedirect][Script] Called from: " + callerLine);
    window.open( url, "_blank" )

}


function searchTwitter() {
    let match = curTab.match( /\/(x|twitter)\.com\/(\w+)(\/|$)/ )
    if ( !match || match.length < 1 )
        return

    let userName = match[2]
        
    openInNewTab( 'https://danbooru.donmai.us/artists?commit=Search&search[any_name_matches]=' + userName )
    
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
    
    let divElements = document.querySelectorAll( "div" )

    for ( let i = 0; i < divElements.length; i++ ) {
        let divText = divElements[i].innerText

        let fanclubs = divText.match( fantiaFanclubUrl )
        if ( fanclubs ) {

            let fanclubId = fanclubs[0].match(/\d+/)
            fanclubId = kemonoUrl + "/fantia/user/" + fanclubId
            openInNewTab( fanclubId )
            break
        }
        
        let posts = divText.match( fantiaPostUrl )
        if ( posts ) {

            openInNewTab( posts[0] )
            break
        }
    }
    
}

function searchFantiaLinkFull() {
    
    let userLink = document.querySelector( "a[href*='fantia.jp/fanclubs']" )
    if ( userLink ) {
        let match = userLink.href.match( /\d+/ ) 
        if ( match && match.length > 0 ) {
            let userId = match[0]
            let newUrl = kemonoUrl + "/fantia/user/" + userId

            openInNewTab( newUrl )
        }
    }
    
}

function searchFanboxLink() {
    
    let userLink = document.querySelector( "a[href^='/users/'], a[href^='/en/users/']" )
    if ( userLink ) {
        let match = userLink.href.match( /\d+/ ) 
        if ( match && match.length > 0 ) {
            let userId = match[0]
            let newUrl = kemonoUrl + "/fanbox/user/" + userId

            openInNewTab( newUrl )
        }
    }
}

function searchFanboxPost() {
    // document.querySelector( "a[href*='fanbox.cc']" ).href.match( /posts\/(\d+)/ )[1]

    const fanboxLink = document.querySelector( "a[href*='fanbox.cc']" )
    if ( !fanboxLink )
        return

    const match = fanboxLink.href.match( /posts\/(\d+)/ )
    if ( !match || match.length < 1 )
        return

    const postId = match[1]

    
    const userLink = document.querySelector( "a[href^='/users/'], a[href^='/en/users/']" )
    if ( !userLink )
        return

    const match2 = userLink.href.match( /\d+/ )
    if ( !match2 || match2.length < 1 )
        return

    const userId = match2[0]
    const newUrl = kemonoUrl + "/fanbox/user/" + userId + "/post/" + postId

    openInNewTab( newUrl )

}

function searchFanboxLinkFull() {

    const divElem = document.querySelector('div[style*="fanbox/public/images/user"')
    if (!divElem || !divElem.style)
        return

    const bgImageUrl = divElem.style['backgroundImage']
    
    let match = bgImageUrl.match( /fanbox\/public\/images\/user\/(\d+)\// )
    if (!match || match.length < 1)
        return
    
    let userId = match[1]
    openInNewTab( kemonoUrl + "/fanbox/user/" + userId )
    
}

function searchDLSite() {
    
    let match = curTab.match( /RG\d+/ )
    if ( match && match.length > 0 ) {
        let circleId = match[0]
        let newUrl = kemonoUrl + "/dlsite/user/" + circleId

        openInNewTab( newUrl )
    }

}

function searchMisskey() {
    // https://misskey.art/@meis12495@misskey.io
    let match = curTab.match( /misskey\.io\/@(\S+)(\/|$)/ )
    if ( match && match.length > 0 ) {
        let userName = match[1]
        
        openInNewTab( 'https://misskey.art/@' + userName + '@misskey.io' )
    }

}

////////// twitter to Danbooru wiki //////////
if ( curTab.match( /\/(twitter|x)\.com\/[a-zA-Z0-9_-]+/ ) ) {
    
    console.log( "[LazRedirect][Script] matched twitter" )

    searchTwitter()
} 

////////// misskey.io to misskey.art //////////
else if ( curTab.match( /misskey\.io\/@.*/ ) ) {
    
    console.log( "[LazRedirect][Script] matched misskey.io" )

    searchMisskey()
} 

////////// Gel to Danbooru wiki //////////
else if ( curTab.match( /gelbooru\.com\/index\.php\?(page=post|id=(\d+)).*&(page=post|id=(\d+))/ ) ) {
    
    console.log( "[LazRedirect][Script] matched gelbooru" )

    searchGelDiv()
} 

////////// Dan to gel search //////////
else if ( curTab.match( /danbooru\.donmai\.us\/artists\/(\d+)/ ) ) {
    
    console.log( "[LazRedirect][Script] matched danbooru artist wiki" )

    searchDanWiki()
} 

////////// Pixiv to kemono //////////
else if ( curTab.match( /pixiv\.net(\/\w{2}|)\/users/ ) || curTab.match( /pixiv\.net(\/\w{2}|)\/artworks/ ) ) {
    
    console.log( "[LazRedirect][Script] matched pixiv" )

    searchFantiaDiv()
    searchFanboxPost()
    searchFanboxLink()
} 

////////// Fanbox to kemono //////////
else if ( curTab.match( /\S+\.fanbox\.cc/ ) ) {
    
    console.log( "[LazRedirect][Script] matched fanbox" )

    searchFantiaLinkFull()
    searchFanboxLinkFull()

} 


////////// DLsite circle to kemono //////////
else if ( curTab.match( /dlsite\.com\/.*\/maker_id\/RG\d+/ ) ) {

    console.log( "[LazRedirect][Script] matched dlsite" )

    searchDLSite()

} 

////////// Patreon id to kemono //////////
else if ( curTab.match( /patreon\.com\/user\?u=(\d+)/ ) ) {
    let match = curTab.match( /patreon\.com\/user\?u=(\d+)/ )
    if ( match && match.length > 0 ) {
        console.log( "[LazRedirect][Script] /patreon\.com\/user\?u=(\d+)/" )
        let userId = match[1]
        let newUrl = kemonoUrl + "/patreon/user/" + userId

        openInNewTab( newUrl )
    }
}

////////// Patreon name to kemono //////////
else if ( curTab.match( /patreon\.com\/\S+/ ) ) {
    console.log( "[LazRedirect][Script] matched patreon" )
    
    const matches = document.querySelector( 'script#__NEXT_DATA__' ).innerText.matchAll( /\/api\/user\/(\d+)/mg )
    const selfId = document.querySelector( 'button[data-tag="account-menu-toggle-switcher"]' ).querySelector('img').src.match( /patreonusercontent.com\/\d\/patreon-media\/p\/user\/(\d+)/ )[1]
    if ( matches ) {
        console.log( "[LazRedirect][Script] __NEXT_DATA__" )

        for ( const match of matches ) {
            const userId = match[1]
            if ( selfId != userId ) {
                console.log( "[LazRedirect][Script] selfId != userId" )
                let newUrl = kemonoUrl + "/patreon/user/" + userId
                openInNewTab( newUrl )
                break
            }
        }

    }
} 

////////// Fantia to Pixiv //////////
else if ( curTab.match( /fantia\.jp\/(fanclubs|posts)\/\d+/ ) || curTab.match( /fantia\.jp\/\S+(\/|)/ ) ) {
    
    console.log( "[LazRedirect][Script] matched fantia" )

    let userLink = document.querySelector( "a[href^='/fanclubs/']" )
    if ( userLink ) {
        let match = userLink.href.match( /\d+/ )
        if ( match && match.length > 0 ) {
            let userId = match[0]
            let newUrl = kemonoUrl + "/fantia/user/" + userId

            openInNewTab( newUrl )
        }
    }



} 

////////// Facebook user to post search //////////
else if ( curTab.match( /facebook\.com/ ) ) {
    
    console.log( "[LazRedirect][Script] matched facebook: " + curTab )
    let userId

    // 社團成員
    if ( curTab.match( /facebook\.com\/groups\/\d+\/user\/\d+/ ) ) {
        console.log( "[LazRedirect][Script] group user /facebook\.com\/groups\/\d+\/user\/d+/" )
        userId = curTab.match( /groups\/\d+\/user\/(\d+)/ )[1]

    } else if ( curTab.match( /facebook\.com\/story\.php.*(\?|&)id/ ) ) {
        console.log( "[LazRedirect][Script] /facebook\.com\/profile\.php\?id/" )
        userId = curTab.match( /story\.php.*(\?|&)id\=(\d+)/ )[2]

    } else if ( curTab.match( /facebook\.com\/profile\.php\?id/ ) ) {
        console.log( "[LazRedirect][Script] /facebook\.com\/profile\.php\?id/" )
        userId = curTab.match( /profile\.php\?id\=(\d+)/ )[1]

    } else if ( curTab.match( /facebook\.com\/[a-zA-Z0-9_\.]+$/ ) ) {
        console.log( "[LazRedirect][Script] /facebook\.com\/[a-zA-Z0-9_\.]+$/" )
        userId = curTab.match( /facebook\.com\/([a-zA-Z0-9_\.]+)$/ )[1]

    } else {
        let userLink = document.querySelector( "a[href^='/photo/?fbid=']" )
        console.log( "[LazRedirect][Script] a[href^='/photo/?fbid=']" )
        if ( userLink ) {
            let match = userLink.href.match( /ecnf.(\d+)/ )
            if ( match && match.length > 1 ) {
                let userId = match[1]
                let newUrl = "https://facebook.com/profile/" + userId + "/search/?q=."
    
                openInNewTab( newUrl )
            }
        }

    }

    if ( userId && userId.length > 1 ) {
        
        let newUrl = "https://facebook.com/profile/" + userId + "/search/?q=."

        openInNewTab( newUrl )
    }
} 



