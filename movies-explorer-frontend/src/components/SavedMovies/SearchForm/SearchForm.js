import React from 'react';
import search from '../../../images/buttonSearch.svg';
import { useState, useEffect } from 'react';

function SearchForm (props) {
  // placeholder="&#128269; Фильм"   //  лупа в плейсхолдер
  // const regex = /[^A-Za-zА-Яа-я0-9]/   //валидация поля ввода регулярным выражением

  function clearingFormLoads () {
    props.setvalueInputMovie('');
  }
  useEffect(()=>{clearingFormLoads()},[])

  function handleOnChange (e) {
    props.setvalueInputMovie(e.target.value);
  }
  function handleOnChangeChecked (e) {
    props.setInputChecked(e.target.checked)
  }

  useEffect(()=>{ props.renderingSavedCard() },[props.inputChecked])

  // сообщение о пустом поле ввода и ошибке запроса
  const [isMessageErr, setIsMessageErr] = useState('');

  function handleOnSubmit (e) {
    e.preventDefault();
    props.setvalueInputMovie(e.target[1].value)
    props.setInputChecked(e.target[3].checked)
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
            // value={props.valueInputMovie}
            placeholder="Фильм" required
          />
          <button className="searchForm__buttonSearch">Найти</button>
        </fieldset>
        <label htmlFor="searchFormCheckbox" className="searchForm__switch">
          <input className="searchForm__switchCheckbox" id="searchFormCheckbox" type="checkbox" 
            onChange={handleOnChangeChecked} 
            // checked={props.inputChecked}
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
