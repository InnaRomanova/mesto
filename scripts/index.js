//Переменные и константы
const popupProfile = document.querySelector('#popup-profile');
const popupPhoto = document.querySelector('.popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const form = document.querySelector('#form');

const profileAddButton = document.querySelector('.profile__add-button');
const photoPopupCloseButton = document.querySelector('#close-Btn');
const formButton = document.querySelector('#button-form');
const cardsOpenPopup = document.querySelector('.popup_open-card');
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');

const elementsContain = document.querySelector('.elements__contain');
const elementCardTemplate = document.querySelector('#elements-card').content;
const photoCloseButton = document.querySelector('#Close-card');

const buttonLike = event => event.target.classList.toggle('elements__button-like_active');
const deleteCard = event => event.target.closest('.elements__block').remove();

// Функции

/*
Функция openPopup разбита на две openPopupForm и openPopupImage
*/

function openPopupForm(item) {
    item.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formParagraph.value = profileParagraph.textContent;
}

function openPopupImage(item, image) {
    item.classList.add('popup_opened');
    imagePopup.src = image.src;
    imagePopup.alt = image.alt;
    captionPopup.textContent = image.alt;
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

/*
Функция добавления карточки разделена на две функции renderCard с return card и createCard
 */
function addCard(link, name) {
    const card = renderCard(link, name); // Создает по шаблону карточку
    createCard(card); // Добавляет в начало элемента elementsContain созданую карточку
}

function renderCard(link, name) {
    const card = elementCardTemplate.querySelector('.elements__block').cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    const cardName = card.querySelector('.elements__name');
    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;
    cardImage.addEventListener('click', card);

    card.querySelector('.elements__button-like').addEventListener('click', buttonLike);
    card.querySelector('.elements__button-delete').addEventListener('click', deleteCard);
    card.querySelector('.photo__open-button').addEventListener('click', () => openPopupImage(cardsOpenPopup, cardImage));
    // Добавлен обработчик событий для картинки. При клике на картинку вызывается функция openPopupImage и открывает popup с картинкой

    return card;
}

function createCard(card) {
    elementsContain.prepend(card);
}

// Добавление картинки
function formPlaceSubmitHandler(evt) {
    const placeInputLink = this.querySelector('#elements__image').value;
    const placeInputName = this.querySelector('#elements__name').value;

    evt.preventDefault(); // Действие предотвращающие обновление страницы

    addCard(placeInputLink, placeInputName);
    formButton.reset();
    closePopup(popupPhoto);
}

// Бизнес логика
// Создание карточек происходит после загрузки страницы
window.onload = function () {
    for (let i = 0; i < initialCards.length; i++) {
        addCard(initialCards[i].link, initialCards[i].name);
    }
};

// Обработчики событий
form.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', () => { openPopupForm(popupProfile) });
popupCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
profileAddButton.addEventListener('click', () => openPopupForm(popupPhoto));
photoPopupCloseButton.addEventListener('click', () => closePopup(popupPhoto));
formButton.addEventListener('submit', formPlaceSubmitHandler);
photoCloseButton.addEventListener('click', () => { closePopup(cardsOpenPopup) });