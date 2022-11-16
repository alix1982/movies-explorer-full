import React, { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList (props) {

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__gallery">
        {props.currentCard.map ((card, index) => {
        if (index >= props.isQuantityCards) {return;}
        return (
          <MoviesCard
            card = {card}
            onCardLike={props.onCardLike}
            offCardLike={props.offCardLike}
            isRequestDelCard={props.isRequestDelCard} setIsRequestDelCard={props.setIsRequestDelCard}
            currentCardMain={props.currentCardMain}
            key={card.id}
          />
        )
      })}
      </ul>
      <button 
        className={`moviesCardList__more ${(props.isButtonMore && 'moviesCardList__more_active')}`}
        onClick={props.handleOnClickButtonMore}
      >Ещё</button>
    </section>
  )
}

export default MoviesCardList