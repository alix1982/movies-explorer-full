import { Link } from 'react-router-dom';


function NoRoute (props) {
  return(
    <section className="noRoute">
      <h2 className="noRoute__heading">404</h2>
      <p className="noRoute__text">Страница не найдена</p>
      <Link to="/" className="noRoute__link">Назад</Link>
    </section>
  )
}

export default NoRoute