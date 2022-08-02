(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.data,r=e.userId,o=e.templateSelector,i=e.handleLikeButton,a=e.handleCardClick,u=e.handleRemoveButton;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=n.name,this._link=n.link,this._templateSelector=o,this._handleCardClick=a,this._handleLikeButton=i,this._handleRemoveButton=u,this._likes=n.likes,this._cardId=n._id,this._UserId=r,this._isUserCard=r===n.owner._id}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__block").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".elements__image"),this._cardName=this._element.querySelector(".elements__name"),this._cardLike=this._element.querySelector(".elements__button-like"),this._cardDelete=this._element.querySelector(".elements__button-delete"),this._LikesCounter=this._element.querySelector(".elements__like-counters"),this._LikesCounter.textContent=this._likes.length,this._setEventListers(),this._toggleLike(),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardName.textContent=this._name,this._element}},{key:"_setEventListers",value:function(){var e=this;this._cardLike.addEventListener("click",(function(){e._handleLikeButton()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._isUserCard?this._element.querySelector(".elements__button-delete").addEventListener("click",(function(t){e._handleRemoveButton(t)})):(this._cardDelete.remove(),this._cardDelete=null)}},{key:"_toggleLike",value:function(){this._chekUserLike()?this.setLike():this.unsetLike()}},{key:"_chekUserLike",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._UserId}))}},{key:"setLike",value:function(){this._cardLike.classList.add("elements__button-like_active"),this.isLiked=!0}},{key:"unsetLike",value:function(){this._cardLike.classList.remove("elements__button-like_active"),this.isLiked=!1}},{key:"updateLikeCounter",value:function(e){this._LikesCounter.textContent=e.length}},{key:"getCardId",value:function(){return this._cardId}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=t,this._inputSelector=n.inputSelector,this._submitButtonSelector=n.submitButtonSelector,this._disabledButtonClass=n.disabledButtonClass,this._inputErrorClass=n.inputErrorClass,this._inputList=Array.from(t.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._inputErrorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._disabledButtonClass),t.textContent="",t.classList.remove(this._inputErrorClass)}},{key:"_checkingValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():this._enableSubmitButton()}},{key:"disableSubmitButton",value:function(){this._buttonElement.classList.add(this._disabledButtonClass),this._buttonElement.setAttribute("disabled",!0)}},{key:"_enableSubmitButton",value:function(){this._buttonElement.classList.remove(this._disabledButtonClass),this._buttonElement.removeAttribute("disabled")}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkingValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){return e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t.addItem(e)}))}},{key:"addItem",value:function(e){var t=this._renderer(e);this._container.prepend(t)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t.popupSelector),this._closeButton=this._popupElement.querySelector(t.closeButtonSelector),this._openedClass=t.openedClass,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add(this._openedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove(this._openedClass),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("mousedown",(function(t){return e._handleCliskClose(t)}))}},{key:"_handleCliskClose",value:function(e){e.target!==this._popupElement&&e.target!==this._closeButton||this.close()}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(){return c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},c.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}function f(e,t){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},f(e,t)}function d(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleSubmit=t,n._form=n._popupElement.querySelector(e.formSelector),n._inputList=n._form.querySelectorAll(e.inputSelector),n._buttonElement=e.submitButtonSelector,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){return e[t.name]=t.value})),e}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"_submit",value:function(e){e.preventDefault(),this._handleSubmit(this._getInputValues())}},{key:"setEventListeners",value:function(){var e=this;c(h(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){e._submit(t),e.close()}))}},{key:"close",value:function(){c(h(a.prototype),"close",this).call(this),this._form.reset()}},{key:"updateSubmitHandler",value:function(e){this._handleSubmit=e}},{key:"renderLoading",value:function(e){this._buttonElement.textContent=!0===e?"Сохранение ...":"Сохранить"}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function S(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popupElement.querySelector(e.imageSelector),t._caption=t._popupElement.querySelector(e.captionSelector),t}return t=a,(n=[{key:"open",value:function(e,t){this._image.alt=e,this._image.src=t,this._caption.textContent=e,v(g(a.prototype),"open",this).call(this)}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.formName,r=t.formAbout,o=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameField=document.querySelector(n),this._aboutField=document.querySelector(r),this._avatarField=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userData={name:this._nameField.textContent,about:this._aboutField.textContent},this._userData}},{key:"setUserInfo",value:function(e){this._nameField.textContent=e.name,this._aboutField.textContent=e.about,this.setUserAvatar(e),this._userId=e._id}},{key:"setUserAvatar",value:function(e){this._avatarField.src=e.avatar}},{key:"getUserId",value:function(){return this._userId}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P={formSelector:".form",inputSelector:".form__item",closeButtons:".popup__close-button",popupProfile:"#popup-profile",profileEditButton:".profile__edit-button",profileAvatar:".profile__image_avatar",formName:".profile__name",formAbout:".profile__about",popupPhoto:".popup-photo",profileAddButton:".profile__add-button",elementsContain:".elements__contain",cardsOpenPopup:".popup_open-card",imagePopup:".popup__image",captionPopup:".popup__caption",openedPopupClass:"popup_opened",popupEditAvatar:"#popup__avatar-edit",avatarEditButton:".profile__avatar-edit-button",popupConfirmationSelector:".popup__delete-photo"};function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B,I=new(function(){function e(t){var n=t.url,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._headers=r,this._url=n}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("".concat(e.status," ").concat(e.statusText))}},{key:"getUserInfo",value:function(){var e=this._url+"/users/me";return fetch(e,{headers:this._headers}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){var e=this._url+"/cards";return fetch(e,{headers:this._headers}).then(this._checkResponse)}},{key:"getAllNeedData",value:function(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}},{key:"updateUserInfo",value:function(e){var t=this._url+"/users/me";return fetch(t,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"addNewCard",value:function(e){var t=this._url+"/cards";return fetch(t,{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"removeCard",value:function(e){var t=this._url+"/cards/".concat(e);return fetch(t,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"addCardLike",value:function(e){var t=this._url+"/cards/likes/".concat(e);return fetch(t,{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteCardLike",value:function(e){var t=this._url+"/cards/likes/".concat(e);return fetch(t,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"updateProfileAvatar",value:function(e){var t=this._url+"/users/me/avatar";return fetch(t,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({url:"https://mesto.nomoreparties.co/v1/cohort-47",headers:{authorization:"6317d273-77cd-40e4-acd5-6cbb113af6b1","Content-Type":"application/json"}}),j={};B={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__button",disabledButtonClass:"form__button_disabled",inputErrorClass:"popup__input_invalid"},document.querySelectorAll(B.formSelector).forEach((function(e){var t=new r(e,B),n=e.getAttribute("name");j[n]=t,t.enableValidation()}));var R=new L(P),A=new _({popupSelector:P.popupProfile,closeButtonSelector:P.closeButtons,openedClass:P.openedPopupClass,formSelector:P.formSelector,inputSelector:P.inputSelector},(function(e){I.updateUserInfo(e).then((function(e){R.setUserInfo(e)}))}));A.setEventListeners(),document.querySelector(P.profileEditButton).addEventListener("click",(function(){j.profile.resetValidation(),A.setInputValues(R.getUserInfo()),A.open()}));var q=function(e,t){N.open(e,t)},T=new i({renderer:function(e){return(r=new t({data:n=e,userId:R.getUserId(),templateSelector:"#elements-card",handleLikeButton:function(){r.isLiked?I.deleteCardLike(r.getCardId()).then((function(e){r.unsetLike(),r.updateLikeCounter(n.likes)})).catch((function(e){console.error(e)})):I.addCardLike(r.getCardId()).then((function(e){r.setLike(),r.updateLikeCounter(n.likes)})).catch((function(e){console.error(e)}))},handleRemoveButton:function(e){var t=e.target.closest(".elements__block"),n=r.getCardId();F.open(),F.updateSubmitHandler((function(){I.removeCard(n).then((function(){t.remove(),F.close()})).catch((function(e){console.error(e)}))}))},handleCardClick:q})).generateCard();var n,r}},P.elementsContain),U=document.querySelector(P.profileAddButton),x=document.querySelector(P.avatarEditButton),D=new _({popupSelector:P.popupPhoto,closeButtonSelector:P.closeButtons,formSelector:P.formSelector,inputSelector:P.inputSelector,openedClass:P.openedPopupClass},(function(e){I.addNewCard(e).then((function(e){T.addItem(e)}))}));D.setEventListeners();var N=new C({popupSelector:P.cardsOpenPopup,closeButtonSelector:P.closeButtons,imageSelector:P.imagePopup,captionSelector:P.captionPopup,openedClass:P.openedPopupClass});N.setEventListeners();var V=new _({popupSelector:P.popupEditAvatar,closeButtonSelector:P.closeButtons,formSelector:P.formSelector,inputSelector:P.inputSelector,openedClass:P.openedPopupClass},(function(e){I.updateProfileAvatar({avatar:e.url}).then((function(e){R.setUserAvatar(e)}))}));V.setEventListeners();var F=new _({popupSelector:P.popupConfirmationSelector,closeButtonSelector:P.closeButtons,formSelector:P.formSelector,inputSelector:P.inputSelector,openedClass:P.openedPopupClass});F.setEventListeners(),U.addEventListener("click",(function(){j.addPhoto.resetValidation(),D.open()})),x.addEventListener("click",(function(){j.avatar.resetValidation(),V.open()})),I.getAllNeedData().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];R.setUserInfo(i),T.renderItems(o)})).catch((function(e){return console.log(e)}))})();