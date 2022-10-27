import React, { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList (props) {
  let arr = []
  if (JSON.parse(localStorage.getItem('arrMovies'))){ 
    arr = JSON.parse(localStorage.getItem('arrMovies')).arrMovies;
  }
  function receiveArrMovies () {
    if (arr){ 
      props.setIsRequestPassed(true);
      if (arr.length === 0) {
        props.setIsSearchMovie('Ничего не найдено')
      } else {props.setIsSearchMovie('')}
    }
  }
  useEffect(() => {receiveArrMovies()},[arr])
  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__gallery">
        {arr.map ((card, index) => {
        if (index >= props.isQuantityCards) {return;}
        return (
          <MoviesCard
            // user= {userContext}
            card = {card}
            onCardLike={props.onCardLike}
            offCardLike={props.offCardLike}
            currentCardMain={props.currentCardMain}
            // setIsOnCardLike={props.setIsOnCardLike} isOnCardLike={props.isOnCardLike}

            // currentCard={props.currentCard} 
            // onSelectedCard={props.onSelectedCard}
            // onCardDelete = {props.onCardDelete}
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