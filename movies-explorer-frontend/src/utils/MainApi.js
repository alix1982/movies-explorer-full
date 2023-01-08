// const MAIN_URL = 'http://localhost:3001';  // для локального сервера
const MAIN_URL = 'https://api.alix576-movie.nomorepartiesxyz.ru';  // для публичного сервера
const MOVIES_URL = 'https://api.nomoreparties.co';


class MainApi {
  constructor ({movieUrl, mainUrl, heading})
  {
    this.movieUrl = movieUrl;
    this.mainUrl = mainUrl;
    this.heading = heading;
  }

  _getStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  patchUserInfo = (inputList) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.mainUrl}/users/me`, {
      method: 'PATCH',
      headers: this.heading,
      body: JSON.stringify({
        email: inputList.email,
        name: inputList.name,
      })
    })
      .then(res => this._getStatus(res))
    );
  } 

  getCards = () => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.mainUrl}/movies`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    );
  }

  postAddCard = (card) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.mainUrl}/movies`, {
      method: 'POST',
      headers: this.heading,
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${this.movieUrl}${card.image.url}`,
        trailerLink: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: `${this.movieUrl}${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        // owner: "633490f552e1e44d60014077"
      })
    })
      .then(res => this._getStatus(res))
    )
  };

  deleteCardDel = (card) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch (`${this.mainUrl}/movies/${card}`, {
        method: 'DELETE',
        headers: this.heading,
      })
      .then(res => this._getStatus(res))
    )
  }

  getUser = () => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.mainUrl}/users/me`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    )
  }

  _setJwt = (token) => {
    this.heading.authorization = `Bearer ${token}`;
  }
}

const mainApi = new MainApi (
  {
    movieUrl: MOVIES_URL,
    mainUrl: MAIN_URL,
    heading: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUzYjQyNWFmNzIzMTk2NjJhZTFjYzEiLCJpYXQiOjE2NjY0MzAwMTksImV4cCI6MTY2NzAzNDgxOX0.GpyRm6OXTAhCgIgiiCX0mjaLJt2CBnmMD7RRfqSM7m0',
      'Content-Type': 'application/json'
    }
  }
);
export {mainApi, MAIN_URL, MOVIES_URL}
