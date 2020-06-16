import {showFilteredFood} from './showFilteredFood.js';
import {renderHeader} from './headerRender.js';
import {showNoResult, showError} from './noResultAndError.js';
import {setLoadingFlag} from './loadingScreen.js';

const baseUrlRequest ="https://www.themealdb.com/api/json/v1/1/";
const listKeyJson = ['strCategory','strArea','strIngredient'];
const baseText = 'Available option for filter';

function renderItemList(menu){
    const objectClicked = menu.target;
    let endPoint ="";
    let jsonKeys ='';

    if (objectClicked.getAttribute('id')=='category'){endPoint = 'list.php?c=list';jsonKeys =listKeyJson[0];}
    else if (objectClicked.getAttribute('id')=='country'){endPoint = 'list.php?a=list';jsonKeys =listKeyJson[1];}
    else{endPoint = 'list.php?i=list';jsonKeys =listKeyJson[2];}

    renderHeader (`${baseText} ${objectClicked.innerText}`);
    setLoadingFlag(true);
    fetch(`${baseUrlRequest}${endPoint}`)      
        .then(response => {setLoadingFlag(false);return response.json();})
        .then(listItem =>{
            
            const dataList = listItem.meals
            const contentContainer = document.querySelector('#contentContainer');
            contentContainer.innerHTML="";
            if (dataList == null ||dataList == undefined){return showNoResult(objectClicked.getAttribute('id'));}

            const itemContainer = document.createElement('content-list');
            itemContainer.items(dataList,jsonKeys,showFilteredFood);
            contentContainer.appendChild(itemContainer);
        })
        .catch(error => showError(error))
}

export {renderItemList}