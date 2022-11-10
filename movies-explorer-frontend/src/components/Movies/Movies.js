// import { useState } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function Movies (props) {
  return(
    <main>
      <SearchForm
        valueInputMovie={props.valueInputMovie} setvalueInputMovie={props.setvalueInputMovie}
        inputChecked={props.inputChecked} setInputChecked={props.setInputChecked}
        currentCard={props.currentCard} setCurrentCard={props.setCurrentCard}
        renderingCard={props.renderingCard}
      />
      <Preloader 
        isSearchMovie={props.isSearchMovie} 
        isRequestPassed={props.isRequestPassed}
      />
      <MoviesCardList 
        isQuantityCards={props.isQuantityCards} 
        handleOnClickButtonMore={props.handleOnClickButtonMore}
        setIsRequestPassed={props.setIsRequestPassed}
        isButtonMore={props.isButtonMore}
        setIsSearchMovie={props.setIsSearchMovie}
        onCardLike={props.onCardLike}
        offCardLike={props.offCardLike}
        currentCardMain={props.currentCardMain}
        isRequestDelCard={props.isRequestDelCard} setIsRequestDelCard={props.setIsRequestDelCard}
      />
    </main>
  )
}

export default Movies