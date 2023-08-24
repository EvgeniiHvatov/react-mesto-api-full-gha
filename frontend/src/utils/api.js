class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authHeaders = null;
  }

  setAuthHeaders(token) {
    console.log(token);
    this._authHeaders = { ...this._headers, authorization: `Bearer ${token}` };
  }
  deleteAuthHeaders() {
    this._authHeaders = null;
  }

  // registerUser(regData) {
  //   return fetch(`${this._baseUrl}/signup`, {
  //       method: "POST",
  //       headers: this._headers,
  //       body: JSON.stringify(regData),
  //   }).then(this._checkAnswer);
  // }

  // loginUser(loginData) {
  //   return fetch(`${this._baseUrl}/signin`, {
  //       method: "POST",
  //       headers: this._headers,
  //       body: JSON.stringify(loginData),
  //   }).then(this._checkAnswer);
  // }

  // checkToken(token) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //       method: "GET",
  //       headers: this._authHeaders,
  //   }).then(this._checkAnswer);
  // }

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
      headers: this._authHeaders,
    })
    .then(this._checkAnswer);
  }

  getInitialCards() {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      headers: this._authHeaders,
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
      headers: this._authHeaders,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  addNewCard(body) {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      method: 'POST',
      headers: this._authHeaders,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  removeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._authHeaders,
    })
    .then(this._checkAnswer);
  }

  addCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'PUT',
      headers: this._authHeaders,
    })
    .then(this._checkAnswer);
  }

  deleteCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._authHeaders,
    })
    .then(this._checkAnswer);
  }

  updateProfileAvatar(body) {
    const requestUrl = this._baseUrl + `/users/me/avatar`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._authHeaders,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }
}

const api = new Api({
  baseUrl: 'https://api.hvatovspb.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;