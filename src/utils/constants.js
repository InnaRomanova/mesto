//массив с карточками
export const initialCards = [
    {
        name: 'Пикник',
        link: 'https://picjumbo.com/wp-content/uploads/toast-at-a-picnic-2210x1473.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Венеция',
        link: 'https://picjumbo.com/wp-content/uploads/typical-houses-on-canal-grande-in-venice-italy-free-photo-2210x1473.jpg'
    },
    {
        name: 'Купальник',
        link: 'https://picjumbo.com/wp-content/uploads/young-sexy-woman-coming-out-of-the-luxury-pool-free-photo-2210x1475.jpg'
    },
    {
        name: 'Группа поддержки',
        link: 'https://i.pinimg.com/originals/2e/60/57/2e6057bbd075360d75654b8d3b47f042.jpg'
    },
    {
        name: 'Монако',
        link: 'https://picjumbo.com/wp-content/uploads/beautiful-brick-stairs-walkway-in-monaco-with-sea-view-free-photo-2210x1473.jpg'
    }
];

export const validationSettings = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    disabledButtonClass: "form__button_disabled",
    inputErrorClass: "popup__input_invalid",
};


export const selectors = {
    formSelector: '.form',
    inputSelector: '.form__item',
    closeButtons: '.popup__close-button',
    popupProfile: '#popup-profile',
    profileEditButton: '.profile__edit-button',
    profileAvatar: '.profile__image_avatar',
    formName: '.profile__name',
    formAbout: '.profile__about',
    popupPhoto: '.popup-photo',
    profileAddButton: '.profile__add-button',
    elementsContain: '.elements__contain',
    cardsOpenPopup: '.popup_open-card',
    imagePopup: '.popup__image',
    captionPopup: '.popup__caption',
    openedPopupClass: 'popup_opened',
    popupEditAvatar: '.popup__avatar-edit',
    avatarEditButton: '.profile__avatar-edit-button',
    popupConfirmationSelector: '.popup__delete-photo',

};