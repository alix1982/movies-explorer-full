import React from 'react';
import imgPromo from '../../../images/imgPromo.svg';

function Promo (props) {
  return (
    <section className="promo">
      <img src= {imgPromo} className="promo__logo" alt="Логотип промо"/>
      <p className="promo__text">Учебный проект студента факультета Веб-разработки.</p>
    </section>
  )
}

export default Promo