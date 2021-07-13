export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  console.log('test register')
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((response) => {
    console.log(password)
    console.log(email)
    console.log(response)
    try {
      if (response.status === 201){
        return response.json();
      }
    } catch(e){
      console.log(e)
      return (e)
    }
  })
  .then((data) => {
    console.log(data)
    return data;
  })
  .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  console.log('test authorize')
  return fetch(`${BASE_URL}/signin`, {
    // mode: "no-cors",
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((response) => {
    console.log(password)
    console.log(email)
    console.log(response)
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((data) => {
    console.log(data)
    // сохраняем токен
    localStorage.setItem('token', data.token);
    console.log(data.token)
    return data;
  })
  .catch((err) => console.log(err));
};

export const getToken = (token) => {
  console.log('testToken')
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    // body: JSON.stringify({ password, email })
  })
  .then((response) => {
    console.log(response)
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    console.log(res)
    return res;
  })
  .catch((err) => console.log(err));
};
// getToken();
// console.log(getToken())
