import './ShowYourContent.js';
import {renderHeader} from './headerRender.js';
import {showNoResult,showError} from './noResultAndError.js';
import {setLoadingFlag} from './loadingScreen.js';

const searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const requestURLCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const requestURLCountry = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const requestURLIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const listKeyJson = {category:'strCategory',country:'strArea',ingredient:'strIngredient'};
const jsonKey = ['strMeal','strMealThumb'];
const textTitle = ['Food category','Food','Food that included']

const showFilteredFood =  (name,type) => {
    const contentContainer = document.querySelector('#contentContainer');
    contentContainer.innerHTML = '';
    let titleText;
    let baseUrl;
    
    if (type == listKeyJson['category']){baseUrl = requestURLCategory;titleText=`${name} ${textTitle[0]}`;}
    else if (type == listKeyJson['country']){baseUrl = requestURLCountry;titleText=`${name} ${textTitle[1]}`;}
    else {baseUrl = requestURLIngredient;titleText=`${textTitle[2]} ${name}`;}
    
    renderHeader (titleText);
    setLoadingFlag(true)
    fetch(`${baseUrl}${name}`)
    .then(response => {setLoadingFlag(false);return response.json();})
    .then(foodList =>{
        
        const contentContainer = document.querySelector('#contentContainer');
        contentContainer.innerHTML="";
        
        const dataList = foodList.meals;
        if (dataList == null ||dataList == undefined){return showNoResult(name);}
        
        
        const showingContent = (foodName) => {
            setLoadingFlag(true);
            fetch(`${searchURL}${foodName}`)
            .then(response => {return response.json();})
            .then(data =>{
                setLoadingFlag(false);

                const showContent = document.createElement('content-food');
                showContent.renderContent(data);
                
                const contentContainer = document.querySelector('#contentContainer');
                contentContainer.innerHTML="";
                contentContainer.appendChild(showContent);
                ;})
            .catch(error => showError(error))
        }

        const itemContainer = document.createElement('content-list');
        itemContainer.items(dataList,jsonKey,showingContent,true);
        contentContainer.appendChild(itemContainer);
    })
    .catch(error => showError(error))
}

export {showFilteredFood};