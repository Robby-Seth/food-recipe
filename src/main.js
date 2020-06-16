
import {homeRender} from './js/homeMenu.js';
import {navRender,navEvent,expandableNav} from './js/navRender.js';
import './js/contentList.js';
import './style/styles.css'

//Menu Element
const htmlMain = document.querySelector('main');
const navResponsiveContainer = document.querySelector('#navResponsiveContainer')
const navElement = navRender();
const expandNavElement = expandableNav('Main Menu');

let navPosMain = false;
let navPosArticle = false;
let navPastPosition = null;
let toggleSmartphone = false;

const getWindowssize = () => {

    
    //Screen Configuration for smartphone and tablets
    if (innerHeight>=innerWidth){
        toggleSmartphone = true;
    }
    else{
        toggleSmartphone=false;   
    }

    if (toggleSmartphone && !(navPosArticle))
        {
            navPosMain = false;
            navPosArticle = true;
            if (navPastPosition != null){navPastPosition.remove();}
            navResponsiveContainer.appendChild (expandNavElement);
            navPastPosition = navResponsiveContainer.firstChild;
            document.querySelector('nav').setAttribute('style',``);
            document.querySelector('article').setAttribute('style',``);
        }
    else{
        if (innerWidth >= 900 && !(navPosMain)){
            navPosMain = true;
            navPosArticle = false;
            if (navPastPosition != null){navPastPosition.remove();}
            htmlMain.insertBefore(navElement,htmlMain.childNodes[0]);
            navPastPosition = htmlMain.firstChild;
            navEvent();
        }
        else if (innerWidth < 900 && !(navPosArticle)){
            navPosMain = false;
            navPosArticle = true;
            if (navPastPosition != null){navPastPosition.remove();}
            navResponsiveContainer.appendChild (expandNavElement);
            navPastPosition = navResponsiveContainer.firstChild;
            document.querySelector('nav').setAttribute('style',``);
            document.querySelector('article').setAttribute('style',``);
        }
    }
    
    //for Computer
    if (!(navPosArticle))
    {
        document.querySelector('nav').setAttribute('style',`height:${innerHeight}px;`);
        document.querySelector('article').setAttribute('style',`max-height:${innerHeight}px;`);
    }
    

    /* DEV ONLY
    const widthInfo = document.querySelector('#widthInfo');
    const heightInfo = document.querySelector('#heightInfo');
    
    if (widthInfo != null){
        widthInfo.innerHTML = innerWidth;
        heightInfo.innerHTML = innerHeight;
    }
    */
}     

window.onresize = getWindowssize;
getWindowssize();
homeRender();
