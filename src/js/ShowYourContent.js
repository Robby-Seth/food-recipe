import {renderHeader} from './headerRender.js';
import {showFilteredFood} from './showFilteredFood.js';

const jsonIngredientKey = ['strIngredient','strMeasure']
const listKeyJson = {category:'strCategory',country:'strArea',ingredient:'strIngredient'};

class Content extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:"open"});
    }

    renderContent (data){
        const styleContainer = document.createElement('style')
        styleContainer.innerText =`

        .imagePlusIngredient{
            display: flex;
        }

        .ingredientContainer{
            flex-basis: 50%;
            padding-top:0;
            background-color: rgb(37,37,37);
            margin-left: 2%;
            border: 5px solid #343a40;
            border-radius: 10px; 
        }
        
        img{
            display: block;
            flex-basis: 50%;
            width: 50%;
            margin-left: 2%;
            border: 5px solid #343a40;
            border-radius: 10px;
        }

        ul{
            list-style-type:none;
            margin-top:0;
        }

        #ingredientList{
            display: flex;
        }
        
        #ingredientList > ul{
            flex-basis: 50%;
            font-size: 1.2rem;
        }
        
        #ingredientList{
            margin-left: 2%;
            color: white;
        }
        
        #ingredientPart{
            list-style-type: decimal;
            list-style-position: inside;
        }

        .recipeContent {
            background-color: rgb(37,37,37);
            margin-left: 2%;
            margin-top :2%;
            padding: 0;
            border: 5px solid #343a40;
            border-radius: 10px; 
        }

        h3{
            margin-top: 0;
            background-color: #343a40;
            color: white;
            padding: 2%;
            text-align: center;
            font-size: 1.2rem;
        }
        
        p {
            background-color: rgb(37,37,37);
            color: white;
            font-size: 1.2rem;
            margin-left:2%
        }

        @media screen and (max-width:1060px){
            .imagePlusIngredient{
                display:block;
            }

            img{
                margin:10px auto;
                width: 80%;
            }

            .recipeContent{
                margin-left:0;
            }

            .ingredientContainer{
                margin-left:0;
            }

            .recipeContent {
                border-radius:unset;
            }

            .ingredientContainer {
                border-radius:unset;
            }
        }
        `

        const foodInfo = data.meals[0];
        const foodTitle = foodInfo['strMeal'];
        const foodOrigin = foodInfo['strArea'];
        const foodCategory = foodInfo['strCategory'];
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
        
        renderHeader(foodTitle);

        const headerContent = document.querySelector('#titleContainer');
        
        const headerLinksContainer = document.createElement('div');
        headerLinksContainer.setAttribute('class','headerLinks')

        const foodOriginLabel = document.createElement('h3');
        foodOriginLabel.setAttribute('class','originLabel');
        foodOriginLabel.addEventListener('click',() => {showFilteredFood(foodOrigin,listKeyJson['country']);});
        foodOriginLabel.innerText = foodOrigin;
        headerLinksContainer.appendChild(foodOriginLabel);

        const foodCategoryLabel = document.createElement('h3');
        foodCategoryLabel.setAttribute('class','categoryLabel')
        foodCategoryLabel.addEventListener('click',() => {showFilteredFood(foodCategory,listKeyJson['category']);});
        foodCategoryLabel.innerText = foodCategory;
        headerLinksContainer.appendChild(foodCategoryLabel);

        headerContent.appendChild(headerLinksContainer);
        
        const foodImageContent = document.createElement('img');
        foodImageContent.setAttribute('src',foodImage);

        const imagePlusIngredientContent = document.createElement('section');
        imagePlusIngredientContent.setAttribute('class','imagePlusIngredient');

        const ingredientContainer = document.createElement('div');
        ingredientContainer.setAttribute('class','ingredientContainer');
        const ingredientLabel = document.createElement('h3');
        ingredientLabel.innerText = "Ingredients";

        const ingredientContent = document.createElement('div');
        ingredientContent.setAttribute('id',"ingredientList");

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
        
        const recipeContainer = document.createElement('section')
        recipeContainer.setAttribute('class','recipeContent');
        const recipeLabel = document.createElement('h3');
        recipeLabel.innerText = "How To Cook";
        const foodRecipeContent = document.createElement('p');
        foodRecipeContent.innerText = foodRecipe;
        recipeContainer.appendChild(recipeLabel);
        recipeContainer.appendChild(foodRecipeContent);

        this._shadowRoot.appendChild(styleContainer);
        this._shadowRoot.appendChild(imagePlusIngredientContent);
        this._shadowRoot.appendChild(recipeContainer);
        
    }
}

customElements.define('content-food',Content);