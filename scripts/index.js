import { initialCards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Переменные и константы
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');
const popupProfile = document.querySelector('#popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const formProfile = document.querySelector('#form_profile');
const formPhoto = document.querySelector('#form_photo');

const profileAddButton = document.querySelector('.profile__add-button');
const cardsOpenPopup = document.querySelector('.popup_open-card');
const elementsContain = document.querySelector('.elements__contain');
const elementsName = document.querySelector('#elements__name');
const elementsImage = document.querySelector('#elements__image');

const config = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    disabledButtonClass: "form__button_disabled",
    inputErrorClass: "popup__input_invalid",
}

// Функции

closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

//функция открытия попапа редактирования профайла
function openPopupProfile() {
    addClassOpened(popupProfile);//открытие попапа
    openPopup(popupProfile);
    formName.value = profileName.textContent;
    formParagraph.value = profileParagraph.textContent;
}

function openPopupPhoto() {
    // возможно добавление действия очистки полей перед открытием
    let myForm = new FormValidator(config, formPhoto);
    myForm._resetValidation();
    addClassOpened(popupPhoto);//открытие попапа
    openPopup(popupPhoto);
}

//функция открытия попапа
function addClassOpened(item) {
    item.classList.add('popup_opened');
}

function openPopup(item) {
    item.addEventListener('mousedown', detectClickOverlay);
    document.addEventListener('keyup', handlePopupCloseEsc);
}

//функция закрытия попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    item.removeEventListener('mousedown', detectClickOverlay);
    document.removeEventListener('keyup', handlePopupCloseEsc);
}

//функция закрытия попапа при клике на Overlay(вне попапа)
function detectClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

//функция закрытия попапа при клике на Escape
function handlePopupCloseEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//функция закрытия попапа редактирования профайла
function handleProfileFormSubmit(evt) {
    //предотвращает обновление страницы
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileParagraph.textContent = formParagraph.value;
    closePopup(popupProfile);
}

function createCard(addCard) {
    const card = new Card(addCard, '#elements-card', handleCardClick);
    return card.generateCard();
}

function handleCardClick(name, link) {
    imagePopup.src = link; //устанавливаем ссылку
    imagePopup.alt = name; //устанавливаем подпись картинке
    captionPopup.textContent = name;
    addClassOpened(cardsOpenPopup);//открываем попап  функцией открытия попапа
    openPopup(cardsOpenPopup); //универсальная функция закрытия картинки при помощи оверелй и Esc
}

// Добавление картинки
function handlePlaceFormSubmit(evt) {
    const data = {
        name: elementsName.value,
        link: elementsImage.value,
    }
    // Действие предотвращает обновление страницы
    evt.preventDefault();
    elementsContain.prepend(createCard(data));
    closePopup(popupPhoto);
    formPhoto.reset();
}

// Бизнес логика
// Создание карточек происходит после загрузки страницы
window.onload = function () {
    for (let i = 0; i < initialCards.length; i++) {
        const card = createCard(initialCards[i]);
        elementsContain.prepend(card);
    }
};

// Обработчики событий
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePlaceFormSubmit);
profileEditButton.addEventListener('click', () => {
    openPopupProfile(popupProfile)
});
profileAddButton.addEventListener('click', () => openPopupPhoto());

//Валидация
document.querySelectorAll('.form').forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
});