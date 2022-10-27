import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList (props) {

  console.log(props.currentCardSaved)
    return (
    <section className="moviesCardList">
      <ul className="moviesCardList__gallery">
        {props.currentCardSaved.map ((card, index) => {
        if (index >= props.isQuantityCards) {return;}
        return (
          <MoviesCard
            // user= {userContext}
            card = {card}
            onCardLike={props.onCardLike}
            offCardLike={props.offCardLike}
            currentCardMain={props.currentCardMain}
            setIsOnCardLike={props.setIsOnCardLike} isOnCardLike={props.isOnCardLike}

            // currentCard={props.currentCard}
            // onSelectedCard={props.onSelectedCard}
            // onCardDelete = {props.onCardDelete}
            key={card.id}
          />
        )
      })}
      </ul>
    </section>
  )
}

export default MoviesCardList
