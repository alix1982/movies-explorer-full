import React from 'react';
import {useEffect, useState} from 'react';

function Card (props) {
  const film = `https://api.nomoreparties.co${props.card.image.url}`;
  // console.log('all')
  // console.log(film)
  
  // установка лайка
  const [isOnCardLike, setIsOnCardLike] = useState(false);  

  function addLike () {
    props.currentCardMain.forEach((c) => {
      if (c.movieId === props.card.id) {setIsOnCardLike(true)}
    });
  };
  useEffect(()=>{addLike()},[props.currentCardMain]);
  function handleCardLike () {
    ((!isOnCardLike) ? setIsOnCardLike(true) : setIsOnCardLike(false));
    ((!isOnCardLike) ? props.onCardLike(props.card) : props.offCardLike(props.card));
    // props.offCardLike(props.card);
    // localStorage.setItem('arrMovies', JSON.stringify({arrMovies: props.currentCard}))
  };
  
  return (
    <section className="card">
      <img src= {film} className="card__film" alt="постер"/>
      <div className="card__info">
       <p className="card__name">{props.card.nameRU}</p>
        <button 
        className={`card__like ${(isOnCardLike) && 'card__likeActive'}`}
        type="button" onClick={handleCardLike}></button> 
      </div>
      <div className="card__line"></div>
      <p className="card__time">{props.card.duration}</p>
    </section>
  )
}

export default Card