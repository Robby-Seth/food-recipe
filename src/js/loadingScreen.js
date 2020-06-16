let tickCount = 0;
let startLoading = null;
const numTicks = 5;
const intervalLoading = 1000;
const contentContainer = document.querySelector('#contentContainer');

const renderLoadingLogo = () => {
    contentContainer.innerHTML = "";
    const loadingTitle = document.createElement('h2');
    loadingTitle.setAttribute('id','loadingElement');
    loadingTitle.innerText = 'Loading Data';

    const tickElement = document.createElement('h2');
    tickElement.setAttribute('id','tickElement');

    contentContainer.appendChild(loadingTitle);
    contentContainer.appendChild(tickElement);
}

const loadingEvent = ()=> {
    const tickElementContainer = document.querySelector('#tickElement')
    const tickProgress = tickElementContainer.innerText;
    if (tickCount > numTicks){
        tickCount = 0;
        tickElementContainer.innerText='';
    }
    else{
        tickCount++;
        tickElementContainer.innerText=`${tickProgress} .`
    }
}

const setLoadingFlag = (loadingStart = false) =>{
    if (loadingStart){
        renderLoadingLogo();
        if (startLoading != null){
            clearInterval(startLoading)
            startLoading = null;
        }
        startLoading = setInterval(loadingEvent, intervalLoading); 
    }
    else{
        if (startLoading!= null){clearInterval(startLoading);}
        startLoading = null;
    }
}

export {setLoadingFlag};
