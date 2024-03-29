import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector(config.formSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    this._buttonElement = this._form.querySelector(config.submitButtonSelector);
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);

    return values;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });
  }

  close(render = true) {
    super.close();
    if (render) {
      this.renderLoading(false)
    }
    this._form.reset();
  }

  updateSubmitHandler(action) {
    this._handleSubmit = action;
  }

  //Уведомляет пользователя, что идет процесс загрузки, обмена с сервером
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._buttonElement.textContent = 'Сохранение ...'
    } else {
      this._buttonElement.textContent = 'Сохранить'
    }
  }
}