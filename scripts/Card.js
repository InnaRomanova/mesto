
export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = this._handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__block').cloneNode(true);
        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardName = this._element.querySelector('.elements__name');
        this._cardLike = this._element.querySelector('.elements__button-like');
        this._cardDelete = this._element.querySelector('.elements__button-delete');
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this.cardName.textContent = this._name;
        this._setEventListers();
        return this._element;
    }

    _setEventListers() {
        this._cardLike.addEventListener('click', () => {
            this._buttonLike();
        })

        this._cardDelete.addEventListener('click', () => {
            this._deleteCard();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        })
    }

    _buttonLike() {
        this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like_active');
    }
    _deleteCard() {
        this._element.remove();
    }

}