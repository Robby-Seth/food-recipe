import './ShowYourContent.js';
import {setLoadingFlag} from './loadingScreen.js';
import {showNoResult,showError} from './noResultAndError.js';
import {renderHeader} from './headerRender.js';

const searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const jsonKey = ['strMeal','strMealThumb'];

const searchFunction = (generateHeader = true,inputSearchValue = null) =>{
    const searchBar = document.querySelector('#searchBar');
    let searchValue;
    if (inputSearchValue != null){searchValue = inputSearchValue;}
    else {searchValue = searchBar.value;}
    /*generater header parameter is used to determine if the search result should create header/title
    or not.It is used exclusively used by homeMenu.js only.*/

    if(generateHeader){renderHeader (`Showing result for ${searchValue}`);}
    setLoadingFlag(true)
    fetch(`${baseUrl}${searchValue}`)
    .then(response => {setLoadingFlag(false);return response.json();})
    .then(searchResultJson=>{
        
        const searchResult = searchResultJson.meals;
        const contentContainer = document.querySelector('#contentContainer');
        contentContainer.innerHTML="";
        if (searchResult == null ||searchResult == undefined){return showNoResult(searchValue);}

        const showingContent = (foodName) => {
            setLoadingFlag(true);
            fetch(`${searchURL}${foodName}`)
            .then(response => {setLoadingFlag(false);return response.json();})
            .then(data =>{
                
                const showContent = document.createElement('content-food');
                showContent.renderContent(data);
                
                const contentContainer = document.querySelector('#contentContainer');
                contentContainer.innerHTML="";
                contentContainer.appendChild(showContent);
                ;})
            .catch(error => showError(error))
        }

        const itemContainer = document.createElement('content-list');
        itemContainer.items(searchResult,jsonKey,showingContent,true);
        contentContainer.appendChild(itemContainer);
    })
    .catch(error => showError(error))
}

export {searchFunction}