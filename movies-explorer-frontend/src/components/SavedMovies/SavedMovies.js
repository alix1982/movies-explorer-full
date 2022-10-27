import SearchForm from '../SavedMovies/SearchForm/SearchForm.js';
import MoviesCardListSaved from '../SavedMovies/MoviesCardList/MoviesCardList.js';
// import Preloader from '../Preloader/Preloader.js';

function Movies (props) {
  return(
    <main>
      <SearchForm
        valueInputMovie={props.valueInputMovie} setvalueInputMovie={props.setvalueInputMovie}
        setInputChecked={props.setInputChecked}
        renderingSavedCard={props.renderingSavedCard}
        setCurrentCard={props.setCurrentCard}  // ??? currentCardMain
      />
      {/* <Preloader/> */}
      <MoviesCardListSaved onCards = {props.onCards} 
        isQuantityCards={props.isQuantityCards} 
        handleOnClickButtonMore={props.handleOnClickButtonMore}
        setIsRequestPassed={props.setIsRequestPassed}
        isButtonMore={props.isButtonMore}
        setIsSearchMovie={props.setIsSearchMovie}
        onCardLike={props.onCardLike}
        offCardLike={props.offCardLike}
        currentCardMain={props.currentCardMain} setCurrentCardMain={props.setCurrentCardMain}
        currentCardSaved={props.currentCardSaved} setCurrentCardSaved={props.setCurrentCardSaved}
        setIsOnCardLike={props.setIsOnCardLike} isOnCardLike={props.isOnCardLike}
      />
    </main>
  )
}

export default Movies