import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

var breakfastSections;

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    // reqwest({
    //     url: 'http://ip.jsontest.com/',
    //     type: 'json',
    //     crossOrigin: true,
    //     success: (resp) => el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.ip}`
    // });

    buildView( el );

    [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click',() => shareFn(network));
    });
}

function buildView( el ) {

    var i, buttonTexts = [], innerText, htmlString = '', navs;

    breakfastSections = document.getElementsByTagName("blockquote")

    for(i = 0; i < breakfastSections.length; i++) {

        innerText = breakfastSections[i].getElementsByTagName("h2")[0].innerHTML;
        buttonTexts.push( innerText );

    }

    for(i = 0; i < buttonTexts.length; i++) {

        htmlString += '<h3 data-ind="' + i + '">' + buttonTexts[i] + '</h3>';

    }

    navs = document.getElementById("nav-list");

    navs.innerHTML = htmlString;

    navs.addEventListener ("click", navClick, false);

    function navClick(e) {
        //alert(e.target);
        i = e.target.getAttribute('data-ind');

        if ( i !== null ) {

            var element = breakfastSections[i];
            var alignWithTop = true;
            element.scrollIntoView(alignWithTop);

        }
}

}


