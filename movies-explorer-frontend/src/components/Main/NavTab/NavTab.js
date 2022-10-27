import React from 'react';
// import { Link } from 'react-router-dom';

function NavTab (props) {
  return (
    <section className="navTab">
      <ul className="navTab__list">
        <li className="navTab__shellLink">
          <a href="#aboutProject" className="navTab__link">О проекте</a>
        </li>
        <li className="navTab__shellLink">
          <a href="#techs" className="navTab__link">Технологии</a>
        </li>
        <li className="navTab__shellLink">
          <a href="#aboutMe" className="navTab__link">Студент</a>
        </li>
      </ul>
    </section>
  )
}

export default NavTab