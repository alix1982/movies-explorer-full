import React from 'react';
import search from '../../../images/buttonSearch.svg';
import { useState, useEffect } from 'react';

function SearchForm (props) {
  // placeholder="&#128269; Фильм"   //  лупа в плейсхолдер
  // const regex = /[^A-Za-zА-Яа-я0-9]/   //валидация поля ввода регулярным выражением

  function clearingFormLoads () {
    props.setvalueInputMovieSaved('');
    props.setInputCheckedSaved(false)
  }
  useEffect(()=>{clearingFormLoads()},[])
  useEffect(()=>{clearingFormLoads()},[props.isNavigateMovies])

  function handleOnChange (e) {
    props.setvalueInputMovieSaved(e.target.value);
  }
  function handleOnChangeChecked (e) {
    props.setInputCheckedSaved(e.target.checked)
  }

  useEffect(()=>{ props.renderingSavedCard() },[props.inputCheckedSaved])

  // сообщение о пустом поле ввода и ошибке запроса
  const [isMessageErr, setIsMessageErr] = useState('');

  function handleOnSubmit (e) {
    e.preventDefault();
    props.setvalueInputMovieSaved(e.target[1].value)
    props.setInputCheckedSaved(e.target[3].checked)
    props.renderingSavedCard();
  }

  return (
    <section className="searchForm">
       <form className="searchForm__form" type="submit" onSubmit={handleOnSubmit}  noValidate > 
        <fieldset className="searchForm__fildSearch">
          <img src={search} className="searchForm__placeholderImg" alt="поиск"/>
          <input 
            className="searchForm__inputText" name="searchFilm" type='text' 
            onChange={handleOnChange}
            placeholder="Фильм" required
          />
          <button className="searchForm__buttonSearch">Найти</button>
        </fieldset>
        <label htmlFor="searchFormCheckbox" className="searchForm__switch">
          <input className="searchForm__switchCheckbox" id="searchFormCheckbox" type="checkbox" 
            onChange={handleOnChangeChecked} 
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
