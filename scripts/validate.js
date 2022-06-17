// I. Отображает ошибку в span
function showInputError(config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

// II. Скрывает ошибку в span
function hideInputError(config, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}

// А. Проверяет инпут на валидацию в параметрах тега.
// Вызов функции от условия I. showInputError II. hideInputError
function checkingValidity(config, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
}

// Функция проверки валидации инпутов формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Б. Проверка инпутов на валидацию и выставление статуса кнопки
function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
}

function disableSubmitButton(button) {
  button.classList.add('form__button_disabled');
  button.setAttribute('disabled', true);
}

function enableSubmitButton(button) {
  button.classList.remove('form__button_disabled');
  button.removeAttribute('disabled');
}

// 2. Выставляет статус для кнопки(активная/неактивная).
// Каждому инпуту дает указание на нажатие клавиш А. checkingValidity Б. toggleButtonState
function setEventListeners(config, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkingValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
}

//1. Для каждой формы: отключает поведения submint у кнопок и вызываем функцию 2. setEventListeners
function enableValidation({ formSelector, ...config }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

//Первый вызов(Точка входа)
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  disabledButtonClass: "form__button_disabled",
  inputErrorClass: "popup__input_invalid",
});
