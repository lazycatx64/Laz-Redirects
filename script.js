

var curTab = window.location.href

chrome.runtime.sendMessage({ badgeText: '42' });

function searchFantia() {
    
    var divElements = document.querySelectorAll("div");

    var fantiaFanclub = /https:\/\/fantia\.jp\/fanclubs/g;
    var fantiaPost = /https:\/\/fantia\.jp\/posts/g;

    for (var i = 0; i < divElements.length; i++) {
        var divText = divElements[i].textContent || divElements[i].innerText;

        var isFanclub = divText.match(fantiaFanclub);
        if (isFanclub) {

            var fantiaUser = isFanclub[0].match(/\d+/);
            fantiaUser = "https://kemono.party/fantia/user/" + fantiaUser
            window.open(fantiaUser, "_blank");
            break;
        }
        
        var isPost = divText.match(fantiaPost);
        if (isPost) {

            var firstMatch = isPost[0];

            window.open(firstMatch, "_blank");
            break;
        }
    }
    
    // var urlPattern = /https:\/\/fantia\.jp\S+/;

    // var links = querySelectorAll("a");

    // for (var j = 0; j < links.length; j++) {
    //     var link = links[j];
    //     var linkHref = link.getAttribute("href");

    //     if (linkHref && urlPattern.test(linkHref)) {
    //         window.open(linkHref, "_blank");
    //         return;
    //     }
    // }


}

// function searchFantia() {
    
//     var divElements = document.querySelectorAll("div");

//     var urlPattern = /https:\/\/fantia\.jp\S+/g;

//     for (var i = 0; i < divElements.length; i++) {
//         var divText = divElements[i].textContent || divElements[i].innerText;

//         var matches = divText.match(urlPattern);
//         if (matches) {

//             var firstMatch = matches[0];

//             window.open(firstMatch, "_blank");
//             break;

//         }
//     }
// }

function searchFanbox() {
    
    var userLink = document.querySelector("a[href^='/users/'], a[href^='/en/users/']");
    if (userLink) {
        var match = userLink.href.match(/\d+/);
        if (match && match.length > 0) {
            var userId = match[0];
            var newURL = "https://kemono.party/fanbox/user/" + userId;

            window.open(newURL, "_blank");
        }
    }
}

////////// Pixiv artist page //////////
if ( curTab.match( /pixiv\.net(\/en|)\/users/ ) ) {

    searchFantia();
    searchFanbox();
} 

////////// Pixiv art page //////////
if ( curTab.match( /pixiv\.net(\/en|)\/artworks/ ) ) {
    
    searchFantia();
    searchFanbox();
} 



