import { initialCards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Переменные и константы
const popupProfile = document.querySelector('#popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const formProfile = document.querySelector('#form_profile');
const formPhoto = document.querySelector('#form_photo');
const photoAddSubmit = document.querySelector('#form__button__photo');

const profileAddButton = document.querySelector('.profile__add-button');
const photoPopupCloseButton = document.querySelector('#close-Btn');
const cardsOpenPopup = document.querySelector('.popup_open-card');
const elementsContain = document.querySelector('.elements__contain');
const photoCloseButton = document.querySelector('#Close-card');

const config = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    disabledButtonClass: "form__button_disabled",
    inputErrorClass: "popup__input_invalid",
}

// Функции

//функция открытия попапа редактирования профайла
function openPopupProfile(item) {
    addClassOpened(item);//открытие попапа
    formName.value = profileName.textContent;
    formParagraph.value = profileParagraph.textContent;
}

function openPopupPhoto(item) {
    // возможно добавление действия очистки полей перед открытием
    addClassOpened(item);//открытие попапа
}

//функция открытия попапа
function addClassOpened(item) {
    item.classList.add('popup_opened');
    item.addEventListener('click', detectClickOverlay);
    document.addEventListener('keyup', handlePopupCloseEsc);
}

//функция закрытия попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    item.removeEventListener('click', detectClickOverlay);
    document.removeEventListener('keyup', handlePopupCloseEsc);
}

//функция закрытия попапа при клике на Overlay(вне попапа)
function detectClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        this.classList.remove('popup_opened');
    }
}

//функция закрытия попапа при клике на Escape
function handlePopupCloseEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            openedPopup.classList.remove('popup_opened');
        }
    }
}

//функция закрытия попапа редактирования профайла
function formSubmitHandler(evt) {
    //предотвращает обновление страницы
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileParagraph.textContent = formParagraph.value;
    closePopup(popupProfile);
}

function createCard(addCard) {
    return (new Card(addCard, '#elements-card').generateCard());
}

// const disableSubmitButton = buttonElement => buttonElement.setAttribute('disabled', true);

// Добавление картинки
function formPlaceSubmitHandler(evt) {
    const data = {
        name: document.querySelector('#elements__name').value,
        link: document.querySelector('#elements__image').value,
    }
    // Действие предотвращает обновление страницы
    evt.preventDefault();
    let card = new Card(data, '#elements-card');
    elementsContain.prepend(card.generateCard());
    formPhoto.reset();
    evt.target.querySelector('.form__button').setAttribute('disabled','')
    // disableSubmitButton(photoAddSubmit);
    closePopup(popupPhoto);
}

// Бизнес логика
// Создание карточек происходит после загрузки страницы
window.onload = function () {
    for (let i = 0; i < initialCards.length; i++) {
        let card = new Card(initialCards[i], '#elements-card');
        elementsContain.prepend(card.generateCard());
    }
};


// Обработчики событий
formProfile.addEventListener('submit', formSubmitHandler);
formPhoto.addEventListener('submit', formPlaceSubmitHandler);
profileEditButton.addEventListener('click', () => { openPopupProfile(popupProfile) });
popupCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
profileAddButton.addEventListener('click', () => openPopupPhoto(popupPhoto));
photoPopupCloseButton.addEventListener('click', () => closePopup(popupPhoto));
photoCloseButton.addEventListener('click', () => { closePopup(cardsOpenPopup) });

document.querySelectorAll('.form').forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
});

export { addClassOpened }