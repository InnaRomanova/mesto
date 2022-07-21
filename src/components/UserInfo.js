export default class UserInfo {
    constructor({formName, formParagraph}) {
        this._nameField = document.querySelector(formName);
        this._paragraphField = document.querySelector(formParagraph);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            about: this._paragraphField.textContent,
        };
    }

    setUserInfo({ profile__name, profile__paragraph }) {
        this._nameField.textContent = profile__name;
        this._paragraphField.textContent = profile__paragraph;
    }
}