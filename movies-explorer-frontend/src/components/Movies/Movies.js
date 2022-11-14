// import { useState } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies (props) {
  return(
    <main>
      <SearchForm
        valueInputMovie={props.valueInputMovie} setvalueInputMovie={props.setvalueInputMovie}
        valueInputMovieSaved={props.valueInputMovieSaved} setvalueInputMovieSaved={props.setvalueInputMovieSaved}
        inputChecked={props.inputChecked} setInputChecked={props.setInputChecked}
        currentCard={props.currentCard} setCurrentCard={props.setCurrentCard}
        renderingCard={props.renderingCard}
      />
      <Preloader 
        isSearchMovie={props.isSearchMovie} 
        isSearchMovieSaved={props.isSearchMovieSaved} 
        isRequestPassed={props.isRequestPassed}
        isNavigateMovies={props.isNavigateMovies}
      />
      <MoviesCardList 
        isQuantityCards={props.isQuantityCards} 
        handleOnClickButtonMore={props.handleOnClickButtonMore}
        setIsRequestPassed={props.setIsRequestPassed}
        isButtonMore={props.isButtonMore}
        setIsSearchMovie={props.setIsSearchMovie}
        onCardLike={props.onCardLike}
        offCardLike={props.offCardLike}
        currentCard={props.currentCard} setCurrentCard={props.setCurrentCard}
        currentCardMain={props.currentCardMain}
        isRequestDelCard={props.isRequestDelCard} setIsRequestDelCard={props.setIsRequestDelCard}
      />
    </main>
  )
}

export default Movies