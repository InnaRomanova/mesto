export default class UserInfo {
    constructor({formName, formParagraph}) {
        this._nameField = document.querySelector(formName);
        this._paragraphField = document.querySelector(formParagraph);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            paragraph: this._paragraphField.textContent,
        };
    }

    setUserInfo({ name, paragraph }) {
        this._nameField.textContent = name;
        this._paragraphField.textContent = paragraph;
    }
}