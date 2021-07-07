class Api {
  constructor({ address, token, groupID }) {
    this._address = address;
    this._token = token;
    this._groupID = groupID;
  }

  getUserInfo() {
    return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._address}/v1/${this._groupID}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  setUserInfo(formData) {
    return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then(this._checkResponse);
  }

  addCard(formData) {
    return fetch(`${this._address}/v1/${this._groupID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse);
  }

  setUserAvatar(formData) {
    return fetch(`${this._address}/v1/${this._groupID}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: formData.avatar
      })
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }
}

const config = {
  address: 'https://mesto.nomoreparties.co',
  token: '83427565-56e8-48c1-b66e-268601726ef3',
  groupID: 'cohort-24'
}

const api = new Api(config);
export default api;

