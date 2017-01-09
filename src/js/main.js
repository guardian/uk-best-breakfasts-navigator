import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

var navElement, breakfastBackBtn;

var breakfastSections;

var submeta;

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

    navElement = document.getElementById("uk-breakfasts-navigator");

    submeta = document.getElementsByClassName("submeta")[0];

    breakfastSections = document.getElementsByTagName("blockquote");

    for(i = 0; i < breakfastSections.length; i++) {

        //innerText = breakfastSections[i].getElementsByTagName("h2")[0].innerHTML;
        innerText = breakfastSections[i].textContent || breakfastSections[i].innerText || "";
        buttonTexts.push( innerText );

    }

    htmlString += '<li class="jumpto" >Jump to</li>';

    for(i = 0; i < buttonTexts.length; i++) {

        htmlString += '<li><span data-ind="' + i + '">' + buttonTexts[i] + '</span></li>';

    }

    navs = document.getElementById("nav-list");

    navs.innerHTML = htmlString;

    navs.addEventListener ("click", navClick, false);

   breakfastBackBtn = document.getElementById("back-to-top-button");

    breakfastBackBtn.addEventListener ("click", backToTop, false);

    function navClick(e) {
        //alert(e.target);
        i = e.target.getAttribute('data-ind');

        if ( i !== null ) {

            var element = breakfastSections[i];
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
        var rect2 = submeta.getBoundingClientRect();

        
        if ( rect.bottom < 20 && rect2.top > 400 ) {

           if (breakfastBackBtn.classList.contains('fade')) {
                
                breakfastBackBtn.className = breakfastBackBtn.className.replace(/\bfade\b/,'');
                
            }

        } else {

            if (breakfastBackBtn.classList.contains('fade')) {
                return;
            }

            breakfastBackBtn.className += " fade";

        }
        
 
    }



}


