import React from 'react';

function Footer (props) {
  return (
    <footer className="footer">
      <p className="footer__partners">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__line"></div>
      <div className="footer__nav">
        <p className="footer__copyright">&copy; 2022 Alix</p>
        <ul className="footer__list">
          <li className="footer__point">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__point">
            <a className="footer__link" href="https://github.com/alix1982" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer