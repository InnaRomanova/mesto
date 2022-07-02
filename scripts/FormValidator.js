export default class FormValidator {
    constructor(config, formElement) {
        this.formElement = formElement;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.disabledButtonClass = config.disabledButtonClass;
        this.inputErrorClass = config.inputErrorClass;
    }
    // II Отображает ошибка в span
    _showInputError(inputElement, errorMessage) {
        inputElement.classList.add(this.inputErrorClass);
        errorMessage.textContent = inputElement.validationMessage;
        errorMessage.classList.add(this.inputErrorClass);
    }

    // II. Скрывает ошибку в span
    _hideInputError(inputElement, errorMessage) {
        inputElement.classList.remove(this.disabledButtonClass);
        errorMessage.textContent = '';
        errorMessage.classList.remove(this.inputErrorClass);
    }

    // А. Проверяет инпут на валидацию в параметрах тега.
    // Вызов функции от условия I. showInputError II. hideInputError
    _checkingValidity(inputElement, errorMessage) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement, errorMessage);
        }
    }

    // Функция проверки валидации инпутов формы
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // Б. Проверка инпутов на валидацию и выставление статуса кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this.disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    disableSubmitButton(buttonElement) {
        buttonElement.classList.add(this.disabledButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.classList.remove(this.disabledButtonClass);
        buttonElement.removeAttribute('disabled');
    }

    // 2. Выставляет статус для кнопки(активная/неактивная).
    // Каждому инпуту дает указание на нажатие клавиш А. checkingValidity Б. toggleButtonState
    _setEventListeners() {
        const inputList = Array.from(
            this.formElement.querySelectorAll(this.inputSelector));
        const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                const errorMessage = this.formElement.querySelector(`#${inputElement.name}-error`);
                this._checkingValidity(inputElement, errorMessage);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    //1. Для каждой формы: отключает поведения submit у кнопок и вызывает функцию 2. setEventListeners
    enableValidation() {
        this.formElement.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners();
    }
}