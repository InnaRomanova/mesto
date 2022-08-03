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
    url: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '6317d273-77cd-40e4-acd5-6cbb113af6b1',
        'Content-Type': 'application/json'
    }
});

// валидация
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
    popupProfile.renderLoading(true)
    api.updateUserInfo(inputsValues).then((data) => {
        profile.setUserInfo(data)
        popupProfile.close()
    })
    .catch((err) => {
        console.log(err)
    })
};

const popupProfile = new PopupWithForm({
    popupSelector: selectors.popupProfile,
    closeButtonSelector: selectors.closeButtons,
    openedClass: selectors.openedPopupClass,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector,
    submitButtonSelector: validationSettings.submitButtonSelector
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
    const card = new Card({
        data: addCard,
        userId: profile.getUserId(),
        templateSelector: '#elements-card',
        handleLikeButton: () => {
            if (card.isLiked) {
                api.deleteCardLike(card.getCardId()).then((cardData) => {
                    card.unsetLike();
                    card.updateLikeCounter(cardData.likes);
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                api.addCardLike(card.getCardId()).then((cardData) => {
                    card.setLike();
                    card.updateLikeCounter(cardData.likes);
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
        handleRemoveButton: (event) => {
            const cardElement = event.target.closest('.elements__block');
            const cardId = card.getCardId();
            popupWithConfirmation.open();
            popupWithConfirmation.updateSubmitHandler(() => {
                api.removeCard(cardId).then(() => {
                    cardElement.remove();
                    popupWithConfirmation.close();
                }).catch((err) => {
                    console.error(err);
                });
            });
        },
        handleCardClick: handleCardClick
    });
    return card.generateCard();
}

const addCard = (cardData) => createCard(cardData);

const cardList = new Section({
    renderer: addCard,
}, selectors.elementsContain);

const cardAddButton = document.querySelector(selectors.profileAddButton);
const editAvatarPopup = document.querySelector(selectors.avatarEditButton);

const sendNewCard = (cardData) => {
    popupNewCard.renderLoading(true)
    api.addNewCard(cardData).then((formData) => {
        cardList.addItem(formData);
        popupNewCard.close()
    })
    .catch((err) => {
        console.log(err)
    })
}

// добавление новой карточки при помощи попапа popupNewCard/используется PopupWithForm
const popupNewCard = new PopupWithForm({
    popupSelector: selectors.popupPhoto,
    closeButtonSelector: selectors.closeButtons,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector,
    openedClass: selectors.openedPopupClass,
    submitButtonSelector: validationSettings.submitButtonSelector
},
    sendNewCard
);
popupNewCard.setEventListeners();

const imagePopup = new PopupWithImage({
    popupSelector: selectors.cardsOpenPopup,
    closeButtonSelector: selectors.closeButtons,
    imageSelector: selectors.imagePopup,
    captionSelector: selectors.captionPopup,
    openedClass: selectors.openedPopupClass
});

imagePopup.setEventListeners();

//добавление аватарки/userData-это объект
const editAvatar = (userData) => {
    avatarPopup.renderLoading(true)
    api.updateProfileAvatar({ avatar: userData.url }).then((formData) => {
        profile.setUserAvatar(formData);
        avatarPopup.close();
    })
    .catch((err) => {
        console.log(err)
    })

}

//попап аватара/использ. PopupWithForm
const avatarPopup = new PopupWithForm({
    popupSelector: selectors.popupEditAvatar,
    closeButtonSelector: selectors.closeButtons,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector,
    openedClass: selectors.openedPopupClass,
    submitButtonSelector: validationSettings.submitButtonSelector
},
    editAvatar
);

avatarPopup.setEventListeners();

const popupWithConfirmation = new PopupWithForm({
    popupSelector: selectors.popupConfirmationSelector,
    closeButtonSelector: selectors.closeButtons,
    formSelector: selectors.formSelector,
    inputSelector: selectors.inputSelector,
    openedClass: selectors.openedPopupClass,
    submitButtonSelector: validationSettings.submitButtonSelector
}
);

popupWithConfirmation.setEventListeners();

cardAddButton.addEventListener('click', () => {
    formValidators['addPhoto'].resetValidation();
    popupNewCard.open();
});

editAvatarPopup.addEventListener('click', () => {
    formValidators['avatar'].resetValidation();
    avatarPopup.open();
});

//возвращает результат необходимых промисов(карточки и инф. польз.)
api.getAllNeedData()
    .then(([cards, userData]) => {
        profile.setUserInfo(userData)
        cardList.renderItems(cards)
    })
    .catch((err) => console.log(err))
