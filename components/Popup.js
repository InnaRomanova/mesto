export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
    }

    //открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    //логика закрытия попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //логика закрытия попапа оверлей
    _handleClickOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    //добавляет слушатель клика иконке закрытия попапа. 
    //Модальное окно также закрывается при клике на затемнённую 
    //область вокруг формы
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) =>
            this._handleClickOverlay(evt));
    }
}

