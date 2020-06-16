let pastEvent;
const menuStyleEvent = event =>{
    const presentEvent = event.target;
    if(pastEvent == undefined){
        presentEvent.setAttribute('style','background-color: rgb(37, 37, 37);');
        pastEvent = presentEvent;
    }
    else if (presentEvent != pastEvent){
        pastEvent.setAttribute('style','');
        presentEvent.setAttribute('style',';background-color: rgb(37, 37, 37);');
        pastEvent = presentEvent;
    }
}
export {menuStyleEvent}