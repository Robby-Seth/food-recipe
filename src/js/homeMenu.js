import {searchFunction} from './searchFunction.js'
import {renderHeader} from './headerRender.js';
const title = 'Welcome To Recipe In One';
const subtitle = 'Where all information about recipe serve in one page';
const generateHeader = false;
const homeRender = () =>{
    renderHeader (title,subtitle);
    searchFunction(generateHeader,"")
};
export{homeRender};