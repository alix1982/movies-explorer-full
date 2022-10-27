import React from 'react';
// import { Link } from 'react-router-dom';
import link from '../../../images/link-icon.svg';


function Portfolio (props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__point">
          <a className="portfolio__link" href="https://github.com/alix1982/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Статичный сайт</p>
            <img src={link} className="portfolio__img" alt="ссылка"/>
          </a>
        </li>
        <li className="portfolio__point">
          <a className="portfolio__link" href="https://github.com/alix1982/russian-travel" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img src={link} className="portfolio__img" alt="ссылка"/>
          </a>
        </li>
        <li className="portfolio__point">
          <a className="portfolio__link" href="https://github.com/alix1982/react-mesto-api-full" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img src={link} className="portfolio__img" alt="ссылка"/>
          </a>
        </li>
      </ul>
      {/* <Link to="/sign-in" className="portfolio__link" ></Link> */}
    </section>
  )
}

export default Portfolio