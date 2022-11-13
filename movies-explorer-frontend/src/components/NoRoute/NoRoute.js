
function NoRoute (props) {
  // let urlBack = window.history.back();
  // console.log(urlBack);
  function backHistory() {
    window.history.go(-2)
  }
  return(
    <section className="noRoute">
      <h2 className="noRoute__heading">404</h2>
      <p className="noRoute__text">Страница не найдена</p>
      <button className="noRoute__link" onClick={backHistory}>Назад</button>
    </section>
  )
}

export default NoRoute