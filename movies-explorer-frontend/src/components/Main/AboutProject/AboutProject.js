import React from 'react';

function AboutProject (props) {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__heading">О проекте</h2>
      <div className="aboutProject__line"></div>
      <ul className="aboutProject__list">
        <li className="aboutProject__description">
          <h3 className="aboutProject__headingDescription">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="aboutProject__description">
          <h3 className="aboutProject__headingDescription">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="aboutProject__scheme">
        <li className="aboutProject__firstBlock">
          <h3 className="aboutProject__textScheme aboutProject__textScheme_green">1 неделя</h3>
          <p className="aboutProject__textBlock">Back-end</p>
        </li>
        <li className="aboutProject__lastBlock">
          <h3 className="aboutProject__textScheme">4 недели</h3>
          <p className="aboutProject__textBlock">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject