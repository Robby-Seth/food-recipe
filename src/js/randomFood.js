import './ShowYourContent.js';
import {showError} from './noResultAndError.js';
import { setLoadingFlag } from './loadingScreen.js';



const baseURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const randomFood = () => {
    setLoadingFlag(true)
    fetch(baseURL)
    .then(response =>{setLoadingFlag(false);return response.json();})
    .then(randomFoodInfo => {

        setLoadingFlag(false);
        const contentContainer = document.querySelector('#contentContainer');
        contentContainer.innerHTML="";
        console.log('random food active')
        
        const showContent = document.createElement('content-food');
        showContent.renderContent(randomFoodInfo);
        
        contentContainer.innerHTML = '';
        contentContainer.appendChild(showContent);
    })
    .catch(error => showError(error))
}

export {randomFood};