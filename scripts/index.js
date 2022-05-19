// Находим форму в DOM
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
// Воспользуйтесь инструментом .querySelector()
// Воспользуйтесь инструментом .querySelector()
const popup = document.querySelector('.popup');
const profileeditbutton = document.querySelector('.profile__edit-button');
const popupbuttonclose = document.querySelector('.popup__button-close');
const ProfileName = document.querySelector('.profile__name');
const ProfileParagraph = document.querySelector('.profile__paragraph');
const formName = document.querySelector('#profile__name');
const formParagraph = document.querySelector('#profile__paragraph');
const form = document.querySelector('.form');

function openPopup() {
    popup.classList.add('popup_opened');
    formName.value = ProfileName.textContent;
    formParagraph.value = ProfileParagraph.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = formName.value;
    ProfileParagraph.textContent = formParagraph.value; 
    closePopup()
    // О том, как это делать, расскажем позже.
    // Так мы можем определить свою логику отправки.
    // Эта строчка отменяет стандартную отправку формы./ Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
}
profileeditbutton.addEventListener('click', openPopup);
popupbuttonclose.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
/*formElement.addEventListener('submit', formSubmitHandler);*/