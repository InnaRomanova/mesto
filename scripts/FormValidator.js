export class FormValidator {
  constructor(config, formElement) {
    this.formElement = formElement;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.disabledButtonClass = config.disabledButtonClass;
    this.inputErrorClass = config.inputElement;
  }


  _showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  // II. Скрывает ошибку в span
  _hideInputError(config, formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  }

  // А. Проверяет инпут на валидацию в параметрах тега.
  // Вызов функции от условия I. showInputError II. hideInputError
  _checkingValidity(config, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, formElement, inputElement);
    }
  }

  // Функция проверки валидации инпутов формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Б. Проверка инпутов на валидацию и выставление статуса кнопки
  _toggleButtonState(config, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement, config);
    } else {
      this._enableSubmitButton(buttonElement, config);
    }
  }

  _disableSubmitButton(buttonElement, config) {
    buttonElement.classList.add(config.disabledButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton(buttonElement, config) {
    buttonElement.classList.remove(config.disabledButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  // 2. Выставляет статус для кнопки(активная/неактивная).
  // Каждому инпуту дает указание на нажатие клавиш А. checkingValidity Б. toggleButtonState
  _setEventListeners(config, formElement) {
    const inputList = Array.from(
      this._formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkingValidity(config, formElement, inputElement);
        this._toggleButtonState(config, inputList, buttonElement);
      });
    });
  }

  //1. Для каждой формы: отключает поведения submit у кнопок и вызываем функцию 2. setEventListeners
  enableValidation({ formSelector, ...config }) {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(config, formElement);
    });
  }
}