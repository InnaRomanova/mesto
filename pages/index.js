import './index.css';
import { initialCards } from '../components/cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import userInfo from '../components/UserInfo.js';

import { config } from '../utils/constants.js';
import {
    imagePopup,
    captionPopup,
    popupProfile,
    popupPhoto,
    profileEditButton,
    closeButtons,
    profileName,
    profileParagraph,
    formName,
    formParagraph,
    formProfile,
    formPhoto,
    profileAddButton,
    cardsOpenPopup,
    elementsContain,
    elementsName,
    elementsImage
} from '../utils/constants.js'


const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formPhoto);
cardFormValidator.enableValidation();

const cards = new Section({
    renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.renderCard()
        cards.addItem(cardElement)
    }
}, elementsContain);


const profileInfo = new userInfo(profileName, profileParagraph);

const handleProfileFormSubmit = (inputValues) => {
    profileInfo.setUserInfo(inputValues);
}

const profilePopup = new PopupWithForm(popupProfile, handleProfileFormSubmit);
profilePopup.setEventListeners();

const photoPopup = new PopupWithForm(popupPhoto, handlePlaceFormSubmit);
photoPopup.setEventListeners();

const popupOpenCard = new PopupWithImage(cardsOpenPopup);
popupOpenCard.setEventListeners();

// Функции

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');// находим 1 раз ближайший к крестику попап
    button.addEventListener('click', () => closePopup(popup));  // устанавливаем обработчик закрытия на крестик
});

//функция открытия попапа редактирования профайла
// function openPopupProfile() {
//     openPopup(popupProfile);//открытие попапа
//     formName.value = profileName.textContent;
//     formParagraph.value = profileParagraph.textContent;
//     profileValidator.resetValidation();
// }

function openPopupPhoto() {
    openPopup(popupPhoto);//открытие попапа
}

// function openPopup(item) {
//     item.classList.add('popup_opened');
//     item.addEventListener('mousedown', detectClickOverlay);
//     document.addEventListener('keyup', handlePopupCloseEsc);
// }

//функция закрытия попапа
// function closePopup(item) {
//     item.classList.remove('popup_opened');
//     item.removeEventListener('mousedown', detectClickOverlay);
//     document.removeEventListener('keyup', handlePopupCloseEsc);
// }

//функция закрытия попапа при клике на Overlay(вне попапа)
// function detectClickOverlay(evt) {
//     if (evt.target === evt.currentTarget) {
//         closePopup(evt.target);
//     }
// }

//функция закрытия попапа при клике на Escape
// function handlePopupCloseEsc(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }

//функция закрытия попапа редактирования профайла
// function handleProfileFormSubmit(evt) {
//     //предотвращает обновление страницы
//     evt.preventDefault();
//     profileName.textContent = formName.value;
//     profileParagraph.textContent = formParagraph.value;
//     closePopup(popupProfile);
// }

function createCard(addCard) {
    const card = new Card(addCard, '#elements-card', handleCardClick);
    return card.generateCard();
}

function handleCardClick(name, link) {
    imagePopup.src = link; //устанавливаем ссылку
    imagePopup.alt = name; //устанавливаем подпись картинке
    captionPopup.textContent = name;
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
    cardFormValidator.disableSubmitButton();
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