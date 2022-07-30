export default class UserInfo {
    constructor({ formName, formParagraph, profileAvatar }) {
        this._nameField = document.querySelector(formName);
        this._paragraphField = document.querySelector(formParagraph);
        this._avatarField = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        this._userData = {
            name: this._nameField.textContent,
            about: this._paragraphField.textContent,
        }
        return this._userData
    }

    setUserInfo(data) {
        this._nameField.textContent = data.name;
        this._paragraphField.textContent = data.about;
        this.setUserAvatar(data);
        this._userId = data._id;
    }

    setUserAvatar(data) {
        this._avatarField.src = data.avatar;
    }

    getUserId() {
        return this._userId;
    }
}