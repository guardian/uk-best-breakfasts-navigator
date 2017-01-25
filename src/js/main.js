import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

var navElement, elephantBackBtn;

var elephantSections;

var submeta, tags;

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

    var i, buttonTexts = [], innerText, htmlString = '', navs, btn;

    navElement = document.getElementById("uk-elephants-navigator");

    submeta = document.getElementsByClassName("submeta")[0];
    tags = document.getElementsByClassName("tags")[0];

    elephantSections = document.getElementsByTagName("blockquote");

    for(i = 0; i < elephantSections.length; i++) {

        //innerText = elephantSections[i].getElementsByTagName("h2")[0].innerHTML;
        innerText = elephantSections[i].textContent || elephantSections[i].innerText || "";
        buttonTexts.push( innerText );

    }

    htmlString += '<li class="jumpto" >Jump to</li>';

    for(i = 0; i < buttonTexts.length; i++) {

        htmlString += '<li><span data-ind="' + i + '">' + buttonTexts[i] + '</span></li>';

    }

    navs = document.getElementById("nav-list");

    navs.innerHTML = htmlString;

    navs.addEventListener ("click", navClick, false);

   elephantBackBtn = document.getElementById("back-to-top-button");

    elephantBackBtn.addEventListener ("click", backToTop, false);

    function navClick(e) {
        //alert(e.target);
        i = e.target.getAttribute('data-ind');

        if ( i !== null ) {

            var element = elephantSections[i];
            var alignWithTop = true;
            element.scrollIntoView(alignWithTop);

        }
    }

    function backToTop(e) {
       
           
            var alignWithTop = true;
            navElement.scrollIntoView(alignWithTop);
    }

    window.addEventListener('scroll', throttle(checkButton, 200));
    window.addEventListener('touchend', throttle(checkButton, 200));

    function throttle(fn, wait) {
        var time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
            }
        }
    }

    function checkButton() {

        var rect = navElement.getBoundingClientRect();
        var rect2;
        var bottomEl = submeta;

        if ( submeta !== undefined ) {
            rect2 = submeta.getBoundingClientRect();
        } else if ( tags !== undefined ) {
            rect2 = tags.getBoundingClientRect();
        } else {
            rect2 = rect;
        }
        
        if ( rect.bottom < 20 && rect2.top > 400 ) {

           if (elephantBackBtn.classList.contains('fade')) {
                
                elephantBackBtn.className = elephantBackBtn.className.replace(/\bfade\b/,'');
                
            }

        } else {

            if (elephantBackBtn.classList.contains('fade')) {
                return;
            }

            elephantBackBtn.className += " fade";

        }
        
 
    }



}


