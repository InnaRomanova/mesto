//массив с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//profile__edit-button
const popupProfile = document.querySelector('#popup-profile');
const profileeditbutton = document.querySelector('.profile__edit-button');
const popupbuttonclose = document.querySelector('.popup__button-close');
const ProfileName = document.querySelector('.profile__name');
const ProfileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const form = document.querySelector('#form');
// elements

const ProfileAddButton = document.querySelector('.profile__add-button');
const CloseBtn = document.querySelector('#close-Btn');
const PopupPhoto = document.querySelector('#popup-photo');
const Elements = document.querySelector('.elements');
const ButtonForm = document.querySelector('#button-form');
const ElementCard = document.querySelector('#elements-card');
const ElementsBlock = document.querySelector('.elements__block');

function openPopup(item) {
    item.classList.add('popup_opened');
    formName.value = ProfileName.textContent;
    formParagraph.value = ProfileParagraph.textContent;
}

profileeditbutton.addEventListener('click', () => {
    openPopup(popupProfile)
});

popupbuttonclose.addEventListener('click', () => {
    closePopup(popupProfile)
});

form.addEventListener('submit', formSubmitHandler);

const ButtonLike = event => event.target.classList.toggle('elements__button-like_active');
const deleteCard = event => event.target.closest('.elements__block').remove();

for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].link, initialCards[i].name);
}

function addCard(link, name) {
    const ElementsContain = document.querySelector('.elements__contain');
    const ElementCardTemplate = document.querySelector('#elements-card').content;
    const card = ElementCardTemplate.querySelector('.elements__block').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardName = card.querySelector('.elements__name');

    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;
    card.querySelector('.elements__button-like').addEventListener('click', ButtonLike);
    card.querySelector('.elements__button-delete').addEventListener('click', deleteCard);
    cardImage.addEventListener('click', card);
    ElementsContain.prepend(card);
}

function closePopup(item) {
    item.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    ProfileName.textContent = formName.value;
    ProfileParagraph.textContent = formParagraph.value;
    closePopup(popupProfile);
}

function formPlaceSubmitHandler(evt) {
    let placeInputLink = this.querySelector('#elements__image').value;
    let placeInputName = this.querySelector('#elements__name').value;
    evt.preventDefault();

    // Удаление последней карточки
    //const ElementsContain = document.querySelector('.elements__contain').querySelectorAll('li');
    //ElementsContain[ElementsContain.length - 1].remove();

    addCard(placeInputLink, placeInputName);
    closePopup(PopupPhoto);
}
/*
const Popup = document.querySelector('.popup');
const ImageOpen = document.querySelector('#Image-Open');
const PopupImage = document.querySelector('popup__image');
const PopupCaption = document.querySelector('popup__caption');
const CloseImage = document.querySelector('#close-image');
const cardImage = document.querySelector('.elements__image');
const cardName = document.querySelector('.elements__name');
function PopupPhoto(photo) {
    document.getElementsByClassName('.elements__image')
}*/

ProfileAddButton.addEventListener('click', () => openPopup(PopupPhoto));
CloseBtn.addEventListener('click', () => closePopup(PopupPhoto));
ButtonForm.addEventListener('submit', formPlaceSubmitHandler);



