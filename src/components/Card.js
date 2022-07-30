export default class Card {
    constructor(data, userId, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = data.likes;
        this._cardId = data._id;
        this._UserId = userId;
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

        this._cardDelete.addEventListener('click', () => {
            this._deleteCard();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _toggleLike() {
        if (this._chekUserLike()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
        //this._cardLike.classList.toggle('elements__button-like_active');
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

    //  _deleteCard() {
    //     this._element.remove();
    // }
}