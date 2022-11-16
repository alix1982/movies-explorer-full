import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from './MainApi.js';

export function useApiAuth () {
  let navigate = useNavigate();
  function register (name, email, password) {
    return fetch(`${MAIN_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then((response) => {
        if (response.ok) {
          navigate("/movies")
          return response.json()
        }
        else {navigate('/signup')}
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }
  function login (email, password) {
    return fetch(`${MAIN_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((response) => {
        if (response.ok) {
          navigate("/movies")
          return response.json()
        }
        else { navigate('/signin') }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }
  // поменять `${BASE_URL}/users/me` для локального сервера 'https://auth.nomoreparties.co/users/me'
  const checkToken = () => {
    // console.log(localStorage.getItem('token'))
    return fetch (`${MAIN_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
  return {register, login, checkToken}
}
