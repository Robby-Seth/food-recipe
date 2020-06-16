import {renderHeader} from './headerRender.js';
const searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const jsonIngredientKey = ['strIngredient','strMeasure']

const getInfo = function(foodName){
    fetch(`${searchURL}${foodName}`)
    .then(response => {return response.json();})
    .then(data =>{showContent(data)})
}

const showContent = function (data){
        const foodInfo = data.meals[0];
        const foodTitle = foodInfo['strMeal'];
        const foodOrigin = foodInfo['strArea'];
        const foodRecipe = foodInfo['strInstructions'];
        const foodImage = foodInfo['strMealThumb'];

        let foodIngredient =[];
        for (let count = 1;count<=20;count++){
            const ingredients = foodInfo[`${jsonIngredientKey[0]}${count}`];
            const ingredientMeasurements = foodInfo[`${jsonIngredientKey[1]}${count}`];
            if ( ingredients != (null||"") && ingredientMeasurements != (null||"")){
                foodIngredient.push({ingredient:ingredients,measurement:ingredientMeasurements})
            }
            else break;
        }

        const contentContainer = document.querySelector('article');
        contentContainer.innerHTML = '';

        renderHeader(foodTitle);
        const headerContent = document.querySelector('header');
        const foodOriginContent = document.createElement('h4');
        foodOriginContent.innerText = foodOrigin;
        headerContent.appendChild(foodOriginContent)

        const foodImageContent = document.createElement('img');
        foodImageContent.setAttribute('src',foodImage);

        const imagePlusIngredientContent = document.createElement('section');

        
        const ingredientContainer = document.createElement('div');
        const ingredientLabel = document.createElement('h4');
        ingredientLabel.innerText = "Ingredients";

        const ingredientContent = document.createElement('div');
        ingredientContent.setAttribute('id',"ingredientContent");

        const ingredientPart = document.createElement('ul');
        ingredientPart.setAttribute('id','ingredientPart')
        const measurementPart = document.createElement('ul');
        measurementPart.setAttribute('id','measurementPart')
        
        foodIngredient.forEach(listIngredient => {
            const ingredientList = document.createElement('li');
            const measurementList = document.createElement('li');
            ingredientList.innerText = `${listIngredient.ingredient}`;
            measurementList.innerText = `${listIngredient.measurement}`;
            ingredientPart.appendChild(ingredientList);
            measurementPart.appendChild(measurementList);
        });
        ingredientContent.appendChild(ingredientPart);
        ingredientContent.appendChild(measurementPart);


        ingredientContainer.appendChild(ingredientLabel);
        ingredientContainer.appendChild(ingredientContent);
        
        
        imagePlusIngredientContent.appendChild(foodImageContent);
        imagePlusIngredientContent.appendChild(ingredientContainer);
        contentContainer.appendChild(imagePlusIngredientContent);

        
        const recipeLabel = document.createElement('h4');
        recipeLabel.innerText = "How To Cook";
        const foodRecipeContent = document.createElement('p');
        foodRecipeContent.innerText = foodRecipe;
        
        contentContainer.appendChild(recipeLabel);
        contentContainer.appendChild(foodRecipeContent);
}

export {showContent,getInfo};