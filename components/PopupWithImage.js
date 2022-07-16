import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(config) {
        super(config);
        this._imagePopup = this._popup.querySelector(config, '..popup__image');
        this._captionPopup = this._popup.querySelector(config, '..popup__caption');
    }

    open(name, link) {
        this._imagePopup.src = link; //устанавливаем ссылку
        this._imagePopup.alt = name; //устанавливаем подпись картинке
        this._captionPopup.textContent = name;
        super.open(); //универсальная функция закрытия картинки при помощи оверелй и Esc
    }
}
