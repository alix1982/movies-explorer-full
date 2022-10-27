import React from 'react';

function Techs (props) {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__heading">Технологии</h2>
      <div className="techs__line"></div>
      <h3 className="techs__technologies">7 технологий</h3>
      <p className="techs__textTechnologies">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__technology">
          <p className="techs__textTechnology">HTML</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">CSS</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">JS</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">React</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">Git</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">Express.js</p>
        </li>
        <li className="techs__technology">
          <p className="techs__textTechnology">mongoDB</p>
        </li>
      </ul>
    </section>
  )
}

export default Techs