import React from 'react';
import {useEffect, useState} from 'react';

function Card (props) {
  const film = `https://api.nomoreparties.co${props.card.image.url}`;

  // установка лайка
  const [isOnCardLike, setIsOnCardLike] = useState(false);  
  
  function addLike () {
    setIsOnCardLike(false);
    props.setIsRequestDelCard(false);
    props.currentCardMain.forEach((c) => {
      if (c.movieId === props.card.id) {
        setIsOnCardLike(true);
        return;
      }
    });
  };
  useEffect(()=>{addLike()},[]);

  useEffect(()=>{addLike()},[props.isRequestDelCard, props.currentCardMain]);
  
  function handleCardLike () {
    ((!isOnCardLike) ? props.onCardLike(props.card) : props.offCardLike(props.card));
  };
  return (
    <section className="card">
      <a href={props.card.trailerLink} target="_blank" rel="noreferrer">
        <img src= {film} className="card__film" alt="постер"/>
      </a>
      <div className="card__info">
       <p className="card__name">{props.card.nameRU}</p>
        <button 
        className={`card__like ${(isOnCardLike) && 'card__likeActive'}`}
        type="button" 
        onClick={handleCardLike}
        ></button> 
      </div>
      <div className="card__line"></div>
      <p className="card__time">{props.card.duration}</p>
    </section>
  )
}

export default Card