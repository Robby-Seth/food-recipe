class ContentList extends HTMLElement{
    constructor(){
        super();
    }

    items (data,key,eventAction,image = false){
        this._data = data;
        this.image = image;
        this.method = eventAction;
        if (image){
            this._jsonKey = key[0];
            this._jsonImageKey = key[1];
        }
        else {this._jsonKey = key;}
        this.render();
    }

    render(){
        let listContainer = document.createElement('ul');
        let countElement = 0;
        for (const x in this._data) {
            /*
            if (countElement == 4){
                this.appendChild(listContainer);
                listContainer = document.createElement('ul');
                countElement = 0;
            }*/

            const item = this._data[x][this._jsonKey];
            const itemContainer = document.createElement('li');
            const textTitle = document.createElement('p');
            let URLImage ='';
            if (this.image){
                itemContainer.setAttribute('class','previewFood')
                URLImage = `${this._data[x][this._jsonImageKey]}/preview`;
                const imageList = document.createElement('img');
                imageList.setAttribute('src',URLImage);
                itemContainer.appendChild(imageList);
                
            }
            textTitle.innerText = item;
            itemContainer.appendChild(textTitle);
            itemContainer.addEventListener('click',() => this.method(item,this._jsonKey))

            
            listContainer.appendChild(itemContainer);
            countElement++;
        }
        this.appendChild(listContainer);
    }    
}

customElements.define('content-list',ContentList)