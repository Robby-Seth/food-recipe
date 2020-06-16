const renderHeader =(title,subtitle = undefined) => {

    const titleContainer = document.querySelector('#titleContainer');
    titleContainer.innerHTML ='';
    titleContainer.setAttribute('class','whiteText');
    
    const titleText = document.createElement('h1')
    titleText.innerText = title;
    titleContainer.appendChild(titleText);

    if (subtitle != undefined){
        const subtitleText = document.createElement('h2')
        subtitleText.innerText = subtitle;
        titleContainer.appendChild(subtitleText);
    }
}

export{renderHeader};