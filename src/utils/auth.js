export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((checkResponse) => {
      console.log(checkResponse)
      if (checkResponse.status === 201) {
        return checkResponse.json();
      }
    })
    .then((checkResponse) => {
      console.log(checkResponse)
      return checkResponse;
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    // mode: "no-cors",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((checkResponse) => {
      if (checkResponse.status === 200) {
        return checkResponse.json();
      }
    })
    .then((checkResponse) => {
      // сохраняем токен
      localStorage.setItem('token', checkResponse.token);
      return checkResponse;
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  })
    .then((checkResponse) => {
      if (checkResponse.status === 200) {
        return checkResponse.json();
      }
    })
    .then((checkResponse) => {
      return checkResponse;
    })
};
