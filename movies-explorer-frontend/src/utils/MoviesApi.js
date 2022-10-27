const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor ({url, heading})
  {
    this.url = url;
    this.heading = heading;
  }

  _getStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

//   patchUserInfo = (inputList) => {
//     this._setJwt(localStorage.getItem('token'));
//     return (fetch(`${this.url}/users/me`, {
//       method: 'PATCH',
//       headers: this.heading,
//       body: JSON.stringify({
//         name: inputList.name,
//         about: inputList.about,
//       })
//     })
//       .then(res => this._getStatus(res))
//     );
//   }

//   postAddCard = (inputList) => {
//     this._setJwt(localStorage.getItem('token'));
//     return (fetch(`${this.url}/cards`, {
//       method: 'POST',
//       headers: this.heading,
//       body: JSON.stringify({
//         name: inputList.name,
//         link: inputList.link
//       })
//     })
//       .then(res => this._getStatus(res))
//     )
//   };

//   patchUserAvatar = (linkAvatar) => {
//     this._setJwt(localStorage.getItem('token'));
//     return (fetch(`${this.url}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this.heading,
//       body: JSON.stringify({
//         avatar: linkAvatar,
//       })
//     })
//       .then(res => this._getStatus(res))
//     )
//   }

//   deleteCardDel = (itemId, method) => {
//     this._setJwt(localStorage.getItem('token'));
//     return (fetch (`${this.url}/cards/${itemId}`, {
//         method: method,
//         headers: this.heading,
//       })
//       .then(res => this._getStatus(res))
//     )
//   }

  getCards = () => {
    // this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    );
  }

//   getUser = () => {
//     this._setJwt(localStorage.getItem('token'));
//     return (fetch(`${this.url}/users/me`, {
//       method: 'GET',
//       headers: this.heading,
//     })
//       .then(res => this._getStatus(res))
//     )
//   }
//   _setJwt = (token) => {
//     this.heading.authorization = `Bearer ${token}`;
//   }
}

const moviesApi = new MoviesApi (
  {
    url: MOVIES_URL,
    heading: {
      // authorization: `Bearer ${localStorage.getItem('token')}`,
      // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUzYjQyNWFmNzIzMTk2NjJhZTFjYzEiLCJpYXQiOjE2NjY0MzAwMTksImV4cCI6MTY2NzAzNDgxOX0.GpyRm6OXTAhCgIgiiCX0mjaLJt2CBnmMD7RRfqSM7m0',
      'Content-Type': 'application/json'
    }
  }
);
export {moviesApi, MOVIES_URL}
