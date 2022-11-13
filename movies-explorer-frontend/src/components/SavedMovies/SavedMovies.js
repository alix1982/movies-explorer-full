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
        valueInputMovieSaved={props.valueInputMovieSaved} setvalueInputMovieSaved={props.setvalueInputMovieSaved}
        inputCheckedSaved={props.inputCheckedSaved} setInputCheckedSaved={props.setInputCheckedSaved}
        renderingSavedCard={props.renderingSavedCard}
        setCurrentCard={props.setCurrentCard}  // ??? currentCardMain
      />
      <Preloader 
        isSearchMovie={props.isSearchMovie} 
        isSearchMovieSaved={props.isSearchMovieSaved} 
        isRequestPassed={props.isRequestPassed}
        isNavigateMovies={props.isNavigateMovies}
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