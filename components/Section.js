export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }
    renderItems(items) {
        items.forEach(item => {
           this._renderer(item); 
        });
    }

    setItem(item) {
        this._containerElement.prepend(item);
    }

    //принимает DOM-элемент и добавляет его в контейнер
    addItem(item) {
        this._containerElement.append(item);
    }
}