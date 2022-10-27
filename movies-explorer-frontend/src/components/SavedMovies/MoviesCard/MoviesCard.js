import React from 'react';
import { useState } from 'react';

function Card (props) {
  const film = props.card.image;
  // console.log('saved')
  // console.log(film)

  // отрисовка карточек и их удаление
  const [isOnCardDelete, setIsOnCardDelete] = useState(false);  

  function handleCardLike () {
    props.offCardLike(props.card);
    setIsOnCardDelete(true)
  };
  
  return (
    <section className={`card ${(isOnCardDelete) && 'card_disabled'}`}>
      <img src= {film} className="card__film" alt="постер"/>
      <div className="card__info">
       <p className="card__name">{props.card.nameRU}</p>
        <button className="card__like_save" type="button" onClick={handleCardLike}></button>
      </div>
      <div className="card__line"></div>
      <p className="card__time">{props.card.duration}</p>
    </section>
  )
}

export default Card