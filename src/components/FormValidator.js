export default class FormValidator {
    constructor(formElement, config) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._disabledButtonClass = config.disabledButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
    // II Отображает ошибка в span
    _showInputError(inputElement) {
        const errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessage.textContent = inputElement.validationMessage;
        errorMessage.classList.add(this._inputErrorClass);
    }

    // II. Скрывает ошибку в span
    _hideInputError(inputElement) {
        const errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._disabledButtonClass);
        errorMessage.textContent = '';
        errorMessage.classList.remove(this._inputErrorClass);
    }

    // А. Проверяет инпут на валидацию в параметрах тега.
    // Вызов функции от условия I. showInputError II. hideInputError
    _checkingValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Функция проверки валидации инпутов формы
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    resetValidation() {
        this._toggleButtonState(); // управляем кнопкой
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement) //очищаем ошибки
        });

    }
    // Б. Проверка инпутов на валидацию и выставление статуса кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._disabledButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._disabledButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }

    // 2. Выставляет статус для кнопки(активная/неактивная).
    // Каждому инпуту дает указание на нажатие клавиш А. checkingValidity Б. toggleButtonState
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkingValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    //1. Для каждой формы: отключает поведения submit у кнопок и вызывает функцию 2. setEventListeners
    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners();
    }
}