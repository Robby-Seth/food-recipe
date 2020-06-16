import {homeRender} from './homeMenu.js';
import {renderItemList} from './menu.js';
import {searchFunction} from './searchFunction.js';
import {randomFood} from './randomFood.js';
import {menuStyleEvent} from './menuClickEvent.js';
import { renderAboutPage } from './aboutPage.js';
const navElement = `<h3 class="navTitle">Navigate Food</h3>
<ul>
    <li class ="menu menuSearch">
        <p class="searchTitle">Find Food</p>
        <input id="searchBar" type="text" placeholder="Write a Food Name"/>
        <button id="buttonSearch">Search</button>
    </li>
    <li id="home" class="menu">Home</li>
    <li id="category" class="menu">By Category</li>
    <li id="ingredient" class="menu">By Main ingredient</li>
    <li id="country" class="menu">By Country</li>
    <li id="surprise" class="menu">Surprise Me</li>
    <li id="about" class="menu">About The Author</li>
</ul>`;
//const contentContainer = document.querySelector('#contentContainer')
//contentContainer.innerHTML="";
let pastEvent = null;
let deFaultExpandableMenu = null;


const navRender = () => {
    const navContainer = document.createElement('nav');
    navContainer.setAttribute('class','darkBackground whiteText')
    navContainer.innerHTML = navElement;
    return navContainer;
}

const closeExpandMenu = () => {
    pastEvent.setAttribute('style','');
    expandMenu(false)
    pastEvent=null;
}

const navEvent = (expandableMenu = false) => {
    const menuHome = document.getElementById('home');
    const menuCategory = document.getElementById('category');
    const menuCountry = document.getElementById('country');
    const menuIngredient = document.getElementById('ingredient');
    const menuSurprise = document.getElementById('surprise');
    const searchButton = document.getElementById('buttonSearch');
    const menuAbout = document.getElementById('about');


    menuHome.addEventListener("click",() => {
        menuStyleEvent(event);
        homeRender();
        if(expandableMenu){closeExpandMenu();}
    });
    
    menuCountry.addEventListener("click",() => {
        menuStyleEvent(event);
        renderItemList(event);
        if(expandableMenu){closeExpandMenu();}
    });
    
    menuIngredient.addEventListener("click",() => {
        menuStyleEvent(event);
        renderItemList(event);
        if(expandableMenu){closeExpandMenu();}
    });
    
    menuCategory.addEventListener("click",() => {
        menuStyleEvent(event);
        renderItemList(event);
        if(expandableMenu){closeExpandMenu();}
    });
    
    searchButton.addEventListener('click',() => {
        const searchBar = document.getElementById('searchBar').value;
        if(searchBar == "" || searchBar == null || searchBar == undefined){return alert('Please fill the search bar')};
        menuStyleEvent(event);
        searchFunction();
        if(expandableMenu){closeExpandMenu();}
    });
    
    menuSurprise.addEventListener('click',() => {
        menuStyleEvent(event);
        randomFood();
        if(expandableMenu){closeExpandMenu();}
    });

    menuAbout.addEventListener('click',()=>{
        menuStyleEvent(event);
        renderAboutPage();
        if(expandableMenu){closeExpandMenu();}
    })
}

const expandMenu = (expand) =>{
    const navContainer = document.querySelector('nav');
    if (expand){
        navContainer.innerHTML = navElement;
        navContainer.appendChild(deFaultExpandableMenu);
    }
    else{
        navContainer.innerHTML = "";
        navContainer.appendChild(deFaultExpandableMenu);
    }
}


const expandableNav = (menuText) =>{
    const navContainer = document.createElement('nav');
    navContainer.setAttribute('class','darkBackground whiteText');

    const menuLabel = document.createElement('p');
    menuLabel.setAttribute('class','collapseMenu darkBackground whiteText');
    menuLabel.innerText = menuText;
    menuLabel.addEventListener("click", event =>{handleExpandableMenu(event)})
    navContainer.appendChild(menuLabel);

    deFaultExpandableMenu = menuLabel;
    return navContainer;
}

const handleExpandableMenu = (event) => {
    const presentEvent = event.target;
    if(pastEvent == null){
        presentEvent.setAttribute('style','background-color: rgb(37, 37, 37);');
        expandMenu(true);
        navEvent(true);
        pastEvent = presentEvent;
    }
    else{
        pastEvent.setAttribute('style','');
        expandMenu(false)
        pastEvent=null;
    }
}


export {navRender,navEvent,expandableNav};
