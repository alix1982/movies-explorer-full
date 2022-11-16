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
        setIsFirstSubmitMovies={props.setIsFirstSubmitMovies}
        renderingCard={props.renderingCard}
      />
      <Preloader 
        isSearchMovie={props.isSearchMovie} 
        isRequestPassed={props.isRequestPassed}
        isNavigateMovies={props.isNavigateMovies}
      />
      <MoviesCardList 
        isQuantityCards={props.isQuantityCards} 
        handleOnClickButtonMore={props.handleOnClickButtonMore}
        setIsRequestPassed={props.setIsRequestPassed}
        isButtonMore={props.isButtonMore}
        onCardLike={props.onCardLike}
        offCardLike={props.offCardLike}
        currentCard={props.currentCard} 
        currentCardMain={props.currentCardMain}
        isRequestDelCard={props.isRequestDelCard} setIsRequestDelCard={props.setIsRequestDelCard}
      />
    </main>
  )
}

export default Movies