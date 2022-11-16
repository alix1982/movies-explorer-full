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
        setvalueInputMovieSaved={props.setvalueInputMovieSaved}
        inputCheckedSaved={props.inputCheckedSaved} setInputCheckedSaved={props.setInputCheckedSaved}
        renderingSavedCard={props.renderingSavedCard}
        isNavigateMovies={props.isNavigateMovies}
      />
      <Preloader 
        isSearchMovieSaved={props.isSearchMovieSaved} 
        isRequestPassed={props.isRequestPassed}
        isNavigateMovies={props.isNavigateMovies}
      />
      <MoviesCardListSaved 
        isQuantityCards={props.isQuantityCards} 
        offCardLike={props.offCardLike}
        currentCardSaved={props.currentCardSaved} 
      />
    </main>
  )
}

export default Movies