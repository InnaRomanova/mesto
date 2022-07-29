import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
    initialCards,
    validationSettings,
    selectors,
} from '../utils/constants.js'

//авторизация Api
const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '6317d273-77cd-40e4-acd5-6cbb113af6b1',
        'Content-Type': 'application/json'
    }
});


const formValidators = {};
const enableValidation = (settings) => {
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach(formElement => {
        const validator = new FormValidator(formElement, settings);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;

        validator.enableValidation();
    });
};

enableValidation(validationSettings);

//profile edit
const profile = new UserInfo(selectors);

const handleProfileFormSubmit = (inputsValues) => {
    profile.setUserInfo(inputsValues)
};

const popupProfile = new PopupWithForm({
    popupSelector: selectors.popupProfile,
    closeButtonSelector: selectors.closeButtons,
    openedClass: selectors.openedPopupClass,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector
},
    handleProfileFormSubmit);
popupProfile.setEventListeners();

const profileEditButton = document.querySelector(selectors.profileEditButton);

profileEditButton.addEventListener('click', () => {
    formValidators['profile'].resetValidation();
    popupProfile.setInputValues(profile.getUserInfo());
    popupProfile.open();
});

const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
};

function createCard(addCard) {
    const card = new Card(addCard, '#elements-card', handleCardClick);
    return card.generateCard();
}

const addCard = (cardData) => cardList.addItem(createCard(cardData));

const cardList = new Section({
    items: initialCards,
    renderer: addCard,
}, selectors.elementsContain);

cardList.renderItems();

const cardAddButton = document.querySelector(selectors.profileAddButton);

const popupNewCard = new PopupWithForm({
    popupSelector: selectors.popupPhoto,
    closeButtonSelector: selectors.closeButtons,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector,
    openedClass: selectors.openedPopupClass
},
    addCard);
popupNewCard.setEventListeners();

const imagePopup = new PopupWithImage({
    popupSelector: selectors.cardsOpenPopup,
    closeButtonSelector: selectors.closeButtons,
    imageSelector: selectors.imagePopup,
    captionSelector: selectors.captionPopup,
    openedClass: selectors.openedPopupClass
});

imagePopup.setEventListeners();

cardAddButton.addEventListener('click', () => {
    formValidators['addPhoto'].resetValidation();
    popupNewCard.open();
});

// Id пользователя
let userId

//возвращает результат необходимых промисов(карточки и инф. польз.)
api.getAllNeedData()
    .then(([cards, userData]) => {
        profile.setUserInfo(userData)
        userId = userData._id
        cardList.render(cards)
    })
    .catch((err) => console.log(err))
