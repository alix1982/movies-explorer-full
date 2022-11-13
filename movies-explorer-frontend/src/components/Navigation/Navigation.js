// import React from 'react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import buttonAkkaunt from '../../images/buttonAkkaunt.svg';
import buttonAkkauntMain from '../../images/buttonAkkauntMain.svg';

function Navigation (props) {
  // console.log(props.isNavigationPopupOpen)
  // console.log(props.isNavigateMovies)
  let butAkk = buttonAkkaunt;
  if (props.auth === 'Main' && (!props.isNavigationPopupOpen)) {butAkk = buttonAkkauntMain};

  useEffect(()=> {
    function onCloseEsc (evt) { evt.key === 'Escape' && props.onClose() };
    document.addEventListener('keydown', onCloseEsc);
    return () => {!props.isNavigationPopupOpen && document.removeEventListener('keydown', onCloseEsc)}
  });

  const activeClassMovies = 
    ({isActive}) => isActive ? 
      `navigation__movies navigation${props.auth}__movies_active` : 
      `navigation__movies navigation${props.auth}__movies`;
  const activeClassMain = 
    ({isActive}) => isActive ? 
      `navigation__main navigation__main_active` : 
      `navigation__main navigation__main`;

  // function transitionMain() {
  //   props.onClose();
  //   props.setIsNavigateMovies(false)
  //  }
  function transitionMovies() {
    props.onClose();
    props.setIsNavigateMovies(false)
    // if (props.isNavigateMovies) {props.setIsNavigateMovies(false)}
    // else {props.setIsNavigateMovies(true)}
    // props.setvalueInputMovie('')
  }
  function transitionSavedMovies() {
    props.onClose();
    props.setIsNavigateMovies(true)
  }
  return (
    <section>
      <div className={`navigation ${(props.isNavigationPopupOpen && 'navigation__active')}`} onClick = {props.onCloseOverlay}>
        <ul className="navigation__list">
          <li className="navigation__point">
            <NavLink to="/" className={activeClassMain} onClick={props.onClose}>Главная</NavLink>
          </li>
          <li className="navigation__point">
            <NavLink to="/movies" className={activeClassMovies} onClick={transitionMovies}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__point">
            <NavLink to="/saved-movie" className={activeClassMovies} onClick={transitionSavedMovies}>
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__point">
            <Link to="/profile" className="navigation__akkaunt" onClick={props.onClose}>
              <img src= {butAkk} className="navigation__buttonAkkaunt" alt="Аккаунт"/>
              <p className={`navigation__textButtonAkkaunt navigation${props.auth}__textButtonAkkaunt`}>Аккаунт</p>
            </Link>
          </li>
        </ul>
        <button className="navigation__buttonClose" onClick={props.onClose}></button>
      </div>
      <button className={`navigation__button navigation${props.auth}__button`} onClick={props.onPopupNavigation}></button>
    </section>
  )
}

export default Navigation