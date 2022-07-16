import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(config, handleSubmit) {
        super(config);
        this._handleSubmit = handleSubmit;
        this._form = this._popupElement.querySelector(config.formSelector);
        this._inputList = this._form.querySelector(config.inputSelector);
    }

    _handleSubmit(evt) {
        evt.preventDefault();
        this.handleSubmit(this._getInputValues);
    }

    //cобирает данные всех полей формы.
    _getInputValues() {
        this._newValues = {}
        this._inputList.forEach(input => newValues[input.name] = input.value);
        return this._newValues;
    }

    setInputValues() {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }


    //при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close();
        this._form.reset();
    }

    //Перезаписывает родительский метод
    setEventListeners() {
super.setEventListeners();
this._form.addEventListener('submit', (evt) => {
    this._handleSubmit(evt);
    this.close();
});
    }

}