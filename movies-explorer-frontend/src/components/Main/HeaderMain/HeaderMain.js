// import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo-movie.svg';

function HeaderMain (props) {
  return (
    <header className="headerMain">
      <img src= {logo} className="headerMain__logo" alt="Логотип"/>
      <div className="headerMain__user">
        <Link to="/signup" className="headerMain__button_register">Регистрация</Link>
        <Link to="/signin" className="headerMain__button_login">Войти</Link>
      </div>
    </header>
  )
}

export default HeaderMain
