class AuthApi {
  constructor(apiAddress) {
    this._authUrl = apiAddress;
  }

_checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(res.status);
}

signUp = (email, password) => {
  return fetch(`${this._authUrl}/signup`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  }).then(this._checkResponse);
}


signIn = (email, password) => {
  return fetch(`${this._authUrl}/signin`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  }).then(this._checkResponse)
  .then((userData) => {
    if (userData.token) {localStorage.setItem('jwt', userData.token)}
  })
}

checkToken = (token) => {
  return fetch(`${this._authUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(this._checkResponse)

}
}

//const apiAuth = new AuthApi('http://localhost:3000');
const apiAuth = new AuthApi('https://api.hvatovspb.nomoredomainsicu.ru');
export default apiAuth;