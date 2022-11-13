import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList (props) {

    return (
    <section className="moviesCardList">
      <ul className="moviesCardList__gallery">
        {props.currentCardSaved.map ((card, index) => {
          if (index >= props.isQuantityCards) {return;}
          return (
            <MoviesCard
              card = {card}
              offCardLike={props.offCardLike}
              key={card.movieId}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default MoviesCardList
