export default class UserInfo {
    constructor({ profileName, profileParagraph }) {
        this._nameProfile = document.querySelector(profileName);
        this._infoProfile = document.querySelector(profileParagraph);
    }

    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            info: this._infoProfile.textContent,
        };
    }

    setUserInfo({ name, info }) {
        this._nameProfile.textContent = name;
        this._infoProfile.textContent = info;
    }
}