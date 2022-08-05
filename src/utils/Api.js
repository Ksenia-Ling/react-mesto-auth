class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._checkResponce)
  }

  // получение изначальных карточек 
  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._checkResponce)
  }

  // метод редактирования профиля
  editProfile(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._checkResponce)
  }

  // метод добавления карточки
  addCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._checkResponce)
  }


  // метод удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponce)
  }

  // метод редактирования аватара пользователя
  editAvatar(avatarInfo) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInfo.avatar
      })
    })
      .then(this._checkResponce)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponce)
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '41f7ca70-8b6e-4b09-83a9-c8acb2ddbee8',
    'Content-Type': 'application/json'
  }
});

