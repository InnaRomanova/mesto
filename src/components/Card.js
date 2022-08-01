export default class Card {
    constructor({data, userId, templateSelector,handleLikeButton, handleCardClick, handleRemoveButton}) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeButton = handleLikeButton;
        this._handleRemoveButton = handleRemoveButton;
        this._likes = data.likes;
        this._cardId = data._id;
        this._UserId = userId;
        this._isUserCard = userId === data.owner._id;
    }

    //получение карточки
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector)
            .content.querySelector('.elements__block').cloneNode(true);
        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.elements__image');
        this._cardName = this._element.querySelector('.elements__name');
        this._cardLike = this._element.querySelector('.elements__button-like');
        this._cardDelete = this._element.querySelector('.elements__button-delete');
        this._LikesCounter = this._element.querySelector('.elements__like-counters');
        this._LikesCounter.textContent = this._likes.length;

        this._setEventListers();
        this._toggleLike();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        return this._element;
    }

    //Слушатели событий
    _setEventListers() {
        this._cardLike.addEventListener('click', () => {
            this._handleLikeButton();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })

        if (!this._isUserCard) {
            this._cardDelete.remove();
            this._cardDelete = null;
        } else {
            this._element.querySelector('.elements__button-delete').addEventListener('click', (event) => {
                this._handleRemoveButton(event);
            });
        }
    }

    _toggleLike() {
        if (this._chekUserLike()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
    }

    _chekUserLike() {
        return this._likes.some(item => item._id === this._UserId);
    }

    setLike() {
        this._cardLike.classList.add('elements__button-like_active');
        this.isLiked = true;
    }

    unsetLike() {
        this._cardLike.classList.remove('elements__button-like_active');
        this.isLiked = false;
    }

    updateLikeCounter(data) {
        this._LikesCounter.textContent = data.length;
    }

    getCardId() {
        return this._cardId
    }
}