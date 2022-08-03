export default class Section {
    constructor( {renderer}, containerSelector ) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(initialCards) {
        initialCards.forEach(item => {
            this.addItem(item);
        });
    }

    addItem(element) {
        const card = this._renderer(element);
        this._container.append(card);
    }
}