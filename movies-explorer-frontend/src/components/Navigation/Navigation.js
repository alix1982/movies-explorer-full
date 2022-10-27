// import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


import buttonAkkaunt from '../../images/buttonAkkaunt.svg';

function Navigation (props) {

  useEffect(()=> {
    function onCloseEsc (evt) { evt.key === 'Escape' && props.onClose() };
    document.addEventListener('keydown', onCloseEsc);
    return () => {!props.isNavigationPopupOpen && document.removeEventListener('keydown', onCloseEsc)}
  })
  return (
    <section>
      <div className={`navigation ${(props.isNavigationPopupOpen && 'navigation__active')}`} onClick = {props.onCloseOverlay}>
        <ul className="navigation__list">
          <li className="navigation__point">
            <Link to="/" className="navigation__main" onClick={props.onClose}>Главная</Link>
          </li>
          <li className="navigation__point">
            <Link to="/movies" className="navigation__movies" onClick={props.onClose}>Фильмы</Link>
          </li>
          <li className="navigation__point">
            <Link to="/saved-movie" className="navigation__movies" onClick={props.onClose}>Сохранённые фильмы</Link>
          </li>
          <li className="navigation__point">
            <Link to="/profile" className="navigation__akkaunt" onClick={props.onClose}>
              <img src= {buttonAkkaunt} className="navigation__buttonAkkaunt" alt="Аккаунт"/>
              <p className="navigation__textButtonAkkaunt">Аккаунт</p>
            </Link>
          </li>
        </ul>
        <button className="navigation__buttonClose" onClick={props.onClose}></button>
      </div>
      <button className="navigation__button" onClick={props.onPopupNavigation}></button>
    </section>
    
  )
}

export default Navigation