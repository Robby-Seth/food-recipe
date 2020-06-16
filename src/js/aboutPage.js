import {renderHeader} from './headerRender.js';
import author from '../img/author_photo.jpg';
import favFoods from '../img/fried_rice.jpg';
import mealDB from '../img/themealdb.png';
const simpleDescription = `A Bachelor of Electrical Engineering who has a passion for learning topics about programming and electrical phenomena. Always strive to become a more productive and better person every day. Wanted to become useful and dependable by family, other people, and his country. And more importantly, he has a good personality and loves his family.`;
const favouriteMeals=`The author favourite meals is fried rice. But unfortunately it wasn't included in the food database and to make it a little bit worse, the database didn't provide filter for indonesian food either. But the author hopes that in the future it will change and indonesian based food will be included in the database.`;
const theMealDb = `The API was provided by TheMealsDB, which provide you with database about foods around world.The API was free to use (but some feature require membership) and it was very easy to use.If you are interested in using the API in your website, know that it was free to use, but always ask for permission from the developer if you want to use it commercially....or become a member and support the developer.You can visit the website from the following link `;

const renderAboutPage = () => {
    const contentContainer = document.querySelector('#contentContainer');
    contentContainer.innerHTML="";
    
    renderHeader('About The Author');

    const aboutTheAuthor = document.createElement('div');
    aboutTheAuthor.setAttribute ('class','aboutPage');
    aboutTheAuthor.innerHTML =`
    <img src="${author}" alt="Author Photos"/>
    <p>${simpleDescription}</p>
    `;

    const theAuthorMeals = document.createElement('div');
    theAuthorMeals.setAttribute ('class','aboutPage');
    theAuthorMeals.setAttribute ('id','authorMeal');
    theAuthorMeals.innerHTML=`<img src="${favFoods}" alt="Author Favourite Meal"/><p>${favouriteMeals}</p>`;

    const creditForTheApi = document.createElement('div');
    creditForTheApi.setAttribute ('class','aboutPage');
    creditForTheApi.innerHTML =`
    <img src="${mealDB}" alt="The MealDB"/>
    <p>${theMealDb}<a href="https://www.themealdb.com/" target="_blank">here</a>.</p>
    `;

    contentContainer.appendChild(aboutTheAuthor);
    contentContainer.appendChild(theAuthorMeals);
    contentContainer.appendChild(creditForTheApi);
} 

export{renderAboutPage};