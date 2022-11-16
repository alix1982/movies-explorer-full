import React from 'react';
import foto from '../../../images/photoDiplom.jpg';

function AboutMe (props) {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__heading">Студент</h2>
      <div className="aboutMe__line"></div>
      <div className="aboutMe__info">
        <figure className="aboutMe__locationFoto">
          <img src= {foto} className="aboutMe__foto" alt="Фото"/>
        </figure>
        <h3 className="aboutMe__name">Александр</h3>
        <p className="aboutMe__work">Скромный служащий, 40 лет</p>
        <p className="aboutMe__live">Я родился и живу в Северодвинске, закончил факультет кораблестроения САФУ. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2007 года работаю в скромной, но хорошей службе.</p>
        <a className="aboutMe__linkGithub" href="https://github.com/alix1982" target="_blank" rel="noreferrer">Github</a>
      </div>
    </section>
  )
}

export default AboutMe