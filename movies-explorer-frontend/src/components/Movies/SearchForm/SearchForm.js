import React from 'react';
import search from '../../../images/buttonSearch.svg';
import { useState, useEffect } from 'react';

function SearchForm (props) {
  // placeholder="&#128269; Фильм"   //  лупа в плейсхолдер
  // const regex = /[^A-Za-zА-Яа-я0-9]/   //валидация поля ввода регулярным выражением

  // заполнение инпута из localStorage и пользователем
  const [counterLocalStorage, setCounterLocalStorage] = useState(false);
  function requestLocalStorage () {
    let inputValue = JSON.parse(localStorage.getItem('arrMovies'));
    // console.log(inputValue)
    if (inputValue && !counterLocalStorage){ 
      props.setvalueInputMovie(inputValue.valueInputMovie);
      props.setInputChecked(inputValue.checked);
      props.setCurrentCard(inputValue.arrMovies)
    }
  }
  useEffect(() => {requestLocalStorage ()},[])

  function handleOnChange (e) {
    setCounterLocalStorage(true)
    // inputValue = e.target.value;
    props.setvalueInputMovie(e.target.value);

  }

  function handleOnChangeChecked (e) {
    setCounterLocalStorage(true)
    // inputValue = e.target.value;
    props.setInputChecked(e.target.checked)
  }

  // сообщение о пустом поле ввода и ошибке запроса
  const [isMessageErr, setIsMessageErr] = useState('');

  function handleOnSubmit (e) {
    e.preventDefault();
    // props.setIsSearchMovie('')
    if (e.target[1].value === '') {
      setIsMessageErr('Нужно ввести ключевое слово');
      return;
    } else {
      props.setvalueInputMovie(e.target[1].value)
      props.setInputChecked(e.target[3].checked)
    }
    // props.onTextButtonSubmit("Удаление...");
    setIsMessageErr('');
    props.renderingCard();
    setCounterLocalStorage(false);
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
            onChange={handleOnChangeChecked} checked={props.inputChecked}
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
