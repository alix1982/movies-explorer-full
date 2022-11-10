import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList (props) {
  // console.log(props.currentCardSaved)
  // function receiveArrMovies () {
  //   props.setIsRequestPassed(true);

  //   if (props.currentCardSaved.length === 0) {
  //     props.setIsSearchMovie('Ничего не найдено')
  //   } else {props.setIsSearchMovie('')}
  // }
  // useEffect(() => {receiveArrMovies()},[props.currentCardSaved])

    return (
    <section className="moviesCardList">
      <ul className="moviesCardList__gallery">
        {props.currentCardSaved.map ((card, index) => {
          if (index >= props.isQuantityCards) {return;}
          return (
            <MoviesCard
              card = {card}
              // onCardLike={props.onCardLike}
              offCardLike={props.offCardLike}
              // currentCardMain={props.currentCardMain}
              // setIsOnCardLike={props.setIsOnCardLike} isOnCardLike={props.isOnCardLike}
              key={card.movieId}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default MoviesCardList
