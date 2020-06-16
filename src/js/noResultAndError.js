import {setLoadingFlag} from "./loadingScreen.js"
const contentContainer = document.querySelector('#contentContainer');
const style = document.createElement('style');
style.innerText = `#noResult,#error{
        color: lightgray;
        text-align: center;
        margin-top: 100px;
        font-weight: 600;
        font-size: 2em;
    }`;
const message = document.createElement('p');

const showNoResult = (text) => {
    setLoadingFlag(false);
    contentContainer.innerHTML ="";
    message.setAttribute('id','noResult');
    message.innerText = `No result for ${text}`;

    contentContainer.appendChild(style);
    contentContainer.appendChild(message);
};

const showError = (error) =>{
    setLoadingFlag(false);
    contentContainer.innerHTML ="";
    message.setAttribute('id','error');
    message.innerText = `Something wrong, we can't get your data check your internet connection. Also the error is "${error}".`;

    contentContainer.appendChild(style);
    contentContainer.appendChild(message);
}

export {showNoResult,showError};