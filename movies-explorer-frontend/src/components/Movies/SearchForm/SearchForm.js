import React from 'react';
import search from '../../../images/buttonSearch.svg';
import { useState, useEffect } from 'react';

function SearchForm (props) {

  // заполнение инпута из localStorage и пользователем
  // function requestLocalStorage () {
  //   let inputValue = JSON.parse(localStorage.getItem('arrMovies'));
  //   props.setvalueInputMovie(inputValue.valueInputMovie);
  //   props.setInputChecked(inputValue.checked);
  //   props.setCurrentCard(inputValue.arrMovies);
  // }
  // useEffect(() => {requestLocalStorage ()},[])

  function handleOnChange (e) {
    props.setvalueInputMovie(e.target.value);
  }
  function handleOnChangeChecked (e) {
    props.setInputChecked(e.target.checked)
  }

  useEffect(()=>{ props.renderingCard() },[props.inputChecked])

  const [isMessageErr, setIsMessageErr] = useState('');  // сообщение о пустом поле ввода и ошибке запроса

  function handleOnSubmit (e) {
    e.preventDefault();
    if (e.target[1].value === '') {
      setIsMessageErr('Нужно ввести ключевое слово');
      return;
    } else {
      props.setvalueInputMovie(e.target[1].value);
      props.setInputChecked(e.target[3].checked);
    }
    setIsMessageErr('');
    props.renderingCard();
  }

  return (
    <section className="searchForm">
       <form className="searchForm__form" type="submit" onSubmit={handleOnSubmit}  noValidate > 
        <fieldset className="searchForm__fildSearch">
          <img src={search} className="searchForm__placeholderImg" alt="поиск"/>
          <input 
            className="searchForm__inputText" name="searchFilm" type='text' 
            onChange={handleOnChange}
            value={props.valueInputMovie}
            placeholder="Фильм" required
          />
          <button className="searchForm__buttonSearch">Найти</button>
        </fieldset>
        <label htmlFor="searchFormCheckbox" className="searchForm__switch">
          <input className="searchForm__switchCheckbox" id="searchFormCheckbox" type="checkbox" 
            onChange={handleOnChangeChecked} 
            checked={props.inputChecked} 
          />
          <span className="searchForm__imgCheckbox"></span>
          <p className="searchForm__textCheckbox">Короткометражки</p>
        </label>
      </form>
      <span className='searchForm__message-error'>{isMessageErr}</span>
      <div className="searchForm__line"></div>
    </section>
  )
}

export default SearchForm
