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
    return Promise.reject(res.status);
  };

  getCards = () => {
    return (fetch(`${this.url}/`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    );
  }
}

const moviesApi = new MoviesApi (
  {
    url: MOVIES_URL,
    heading: {
      'Content-Type': 'application/json'
    }
  }
);
export {moviesApi, MOVIES_URL}
