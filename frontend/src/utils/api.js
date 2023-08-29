class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._baseUrl + `/users/me`;
    return fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
    })
    .then(this._checkAnswer);
  }

  getInitialCards() {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
    })
    .then(this._checkAnswer);
  }

  getDataFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    const requestUrl = this._baseUrl + `/users/me`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  addNewCard(body) {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  removeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
    })
    .then(this._checkAnswer);
  }

  addCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
    })
    .then(this._checkAnswer);
  }

  deleteCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
    })
    .then(this._checkAnswer);
  }

  updateProfileAvatar(body) {
    const requestUrl = this._baseUrl + `/users/me/avatar`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('jwt') }`,
      },
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }
}

const api = new Api('http://localhost:3000');

export default api;