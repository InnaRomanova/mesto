export default class UserInfo {
    constructor({ formName, formAbout, profileAvatar }) {
        this._nameField = document.querySelector(formName);
        this._aboutField = document.querySelector(formAbout);
        this._avatarField = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        this._userData = {
            name: this._nameField.textContent,
            about: this._aboutField.textContent,
        }
        return this._userData
    }

    setUserInfo(data) {
        this._nameField.textContent = data.name !== '' ? data.name : '';
        this._aboutField.textContent = data.about !== '' ? data.about : '';
        this.setUserAvatar(data);
        this._userId = data._id !== null ? data._id : null;
    }

    setUserAvatar(data) {
        this._avatarField.src = data.avatar;
    }

    getUserId() {
        return this._userId;
    }
}