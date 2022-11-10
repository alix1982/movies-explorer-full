import SearchForm from '../SavedMovies/SearchForm/SearchForm.js';
import MoviesCardListSaved from '../SavedMovies/MoviesCardList/MoviesCardList.js';
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader.js';

function Movies (props) {

  function firstRenderingSavedCard () {
    props.setCurrentCardSaved(props.currentCardMain)
  }
  useEffect(()=>{firstRenderingSavedCard()},[])

  return(
    <main>
      <SearchForm
        valueInputMovie={props.valueInputMovie} setvalueInputMovie={props.setvalueInputMovie}
        inputChecked={props.inputChecked} setInputChecked={props.setInputChecked}
        renderingSavedCard={props.renderingSavedCard}
        setCurrentCard={props.setCurrentCard}  // ??? currentCardMain
      />
      <Preloader 
        isSearchMovie={props.isSearchMovie} 
        isRequestPassed={props.isRequestPassed}
      />
      <MoviesCardListSaved 
        isQuantityCards={props.isQuantityCards} 
        offCardLike={props.offCardLike}
        currentCardMain={props.currentCardMain} 
        currentCardSaved={props.currentCardSaved} 
      />
    </main>
  )
}

export default Movies