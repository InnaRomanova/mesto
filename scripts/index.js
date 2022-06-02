//profile__edit-button
const popupProfile = document.querySelector('#popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton= document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const form = document.querySelector('#form');
// elements 
const profileAddButton = document.querySelector('.profile__add-button');
const photoPopupCloseButton = document.querySelector('#close-Btn');
const formButton = document.querySelector('#button-form');
const cardsOpenPopup = document.querySelector('.popup_open-card'); 
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');

/*
В функцию openPopup передаются два аргумента и для второго используется значение по умолчанию
Если в функцию передано два параметра (стр. photoOpenButton.forEach...), то мы обрабатываем попап с отображением картинки
Иначе обрабатываем, как редактирование профиля
*/

function openPopup(item, image = false) {
    item.classList.add('popup_opened');
    if(image){
        imagePopup.src = image.src;
        imagePopup.alt = image.alt;
        captionPopup.innerHTML = image.alt;
    }
    else{
        formName.value = profileName.textContent;
        formParagraph.value = profileParagraph.textContent;
    }
}

function closePopup(item) {
    item.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileParagraph.textContent = formParagraph.value;
    closePopup(popupProfile);
}

form.addEventListener('submit', formSubmitHandler);

const buttonLike = event => event.target.classList.toggle('elements__button-like_active');
const deleteCard = event => event.target.closest('.elements__block').remove();

for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].link, initialCards[i].name);
}

function addCard(link, name) {
    const elementsContain = document.querySelector('.elements__contain');
    const ElementCardTemplate = document.querySelector('#elements-card').content;
    const card = ElementCardTemplate.querySelector('.elements__block').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardName = card.querySelector('.elements__name');

    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;
    card.querySelector('.elements__button-like').addEventListener('click', buttonLike);
    card.querySelector('.elements__button-delete').addEventListener('click', deleteCard);
    //cardImage.addEventListener('click', () => formPlaceSubmitHandler(link, name));
    
    cardImage.addEventListener('click', card);
    elementsContain.prepend(card);
   }



function formPlaceSubmitHandler(evt) {
    const placeInputLink = this.querySelector('#elements__image').value;
    const placeInputName = this.querySelector('#elements__name').value;
    evt.preventDefault();

    addCard(placeInputLink, placeInputName);
    closePopup(popupPhoto);
}

const photoOpenButton = document.querySelectorAll('.photo__open-button'); // querySelectorAll получения списка элементов по селектору
const photoCloseButton = document.querySelector('#Close-card');

profileEditButton.addEventListener('click', () => {openPopup(popupProfile)});
popupCloseButton.addEventListener('click', () => {closePopup(popupProfile)});
//document.getElementById('popup-profile').reset();
profileAddButton.addEventListener('click', () => openPopup(popupPhoto));
photoPopupCloseButton.addEventListener('click', () => closePopup(popupPhoto));

formButton.addEventListener('submit', formPlaceSubmitHandler);
photoCloseButton.addEventListener('click', () => {closePopup(cardsOpenPopup)});
// К каждой картинке карточки через forEach Добавляется событие popup
photoOpenButton.forEach(element => element.addEventListener('click', () => {openPopup(cardsOpenPopup, element)}));