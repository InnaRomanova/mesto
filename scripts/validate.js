/*const setDisableBtn = (buttonElement, config) => {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

const setRemoveBtn = (buttonElement, config) => {
    buttonElement.classList.remove(config, inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
};

const show*/

const showInputError = (config, formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.add(config, inputErrorClass);
    errorElement.textContent = "";
  };
  
  const hideInputError = (config, formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.remove(config, inputErrorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (config, formElement, inputElement, inputErrorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputErrorClass, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement, inputErrorClass);
    }
  };
  
  hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (config, inputList, ButtonElement) => {
    if (hasInvalidInput(inputList)) {
      ButtonElement.classList.add(config, inactiveButtonClass);
      ButtonElement.setAttribute("disabled", true);
    } else {
      ButtonElement.classList.remove(config, inactiveButtonClass);
      ButtonElement.removeAttribute("disabled");
    }
  };
  
  function setEventListeners(
    inputSelector,
    formElement,
    submitButtonSelector,
    config,
    inputErrorClass
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const ButtonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(config, inputList, ButtonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        
        checkInputValidity(config, formElement, inputElement, inputErrorClass);
        toggleButtonState(config, inputList, ButtonElement);
      });
    });
  }
  
  const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(
        params.inputSelector,
        formElement,
        params.submitButtonSelector,
        params.config,
        params.inputErrorClass
      );
    });
  };
  
  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_invalid",
    errorClass: "popup__error_visible",
    config: "somthing"
  });