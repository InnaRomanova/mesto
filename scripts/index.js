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
const popupPhoto = document.querySelector('.popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-button');
const ProfileName = document.querySelector('.profile__name');
const ProfileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const form = document.querySelector('#form');
// elements

const ProfileAddButton = document.querySelector('.profile__add-button');
const CloseBtn = document.querySelector('#close-Btn');
const Elements = document.querySelector('.elements');
const ButtonForm = document.querySelector('#button-form');
const ElementCard = document.querySelector('#elements-card');
const ElementsBlock = document.querySelector('.elements__block');

const Popup = document.querySelector('.popup');
const PopupOpenCard = document.querySelector('.popup_open-card'); 
const PopupImage = document.querySelector('.popup__image');
const PopupCaption = document.querySelector('.popup__caption');

const cardImage = document.querySelector('.elements__image');
const cardName = document.querySelector('.elements__name');

/*
В функцию openPopup передаются два аргумента и для второго используется значение по умолчанию
Если в функцию передано два параметра (стр. photoOpenButton.forEach...), то мы обрабатываем попап с отображением картинки
Иначе обрабатываем, как редактирование профиля
*/

function openPopup(item, image = false) {
    item.classList.add('popup_opened');
    if(image){
        PopupImage.src = image.src;
        PopupImage.alt = image.alt;
        PopupCaption.innerHTML = image.alt;
    }
    else{
        formName.value = ProfileName.textContent;
        formParagraph.value = ProfileParagraph.textContent;
    }
}

function closePopup(item) {
    item.classList.remove('popup_opened');
}

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
    closePopup(popupPhoto);
}

const photoOpenButton = document.querySelectorAll('.photo__open-button'); // querySelectorAll получения списка элементов по селектору
const photoCloseButton = document.querySelector('#Close-card');

profileEditButton.addEventListener('click', () => {openPopup(popupProfile)});
popupButtonClose.addEventListener('click', () => {closePopup(popupProfile)});
ProfileAddButton.addEventListener('click', () => openPopup(popupPhoto));
CloseBtn.addEventListener('click', () => closePopup(popupPhoto));
ButtonForm.addEventListener('submit', formPlaceSubmitHandler);
photoCloseButton.addEventListener('click', () => {closePopup(PopupOpenCard)});
// К каждой картинке карточки через forEach Добавляется событие popup
photoOpenButton.forEach(element => element.addEventListener('click', () => {openPopup(PopupOpenCard, element)}));