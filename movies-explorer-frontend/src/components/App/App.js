import React from 'react';
import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Footer from '../Footer/Footer.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import ProtectedRoute from '../ProtectedRoute.js';

import NoRoute from '../NoRoute/NoRoute';

import { moviesApi } from '../../utils/MoviesApi.js';
import { mainApi } from '../../utils/MainApi.js';
import { useApiAuth } from '../../utils/ApiAuth.js';

import {CurrentUserContext, currentUserContext} from '../../contexts/CurrentUserContext.js';
import constants from '../../config.js';

function App() {

  const [isNavigationPopupOpen, setIsNavigationPopup] = useState(false);
  const [isRequestPassed, setIsRequestPassed] = useState(false); //прохождение запроса карточек фильмов с сервера практикума
  const [isButtonMore, setIsButtonMore] = useState(false); // отрисовка кнопки "Ещё"
  const [isButtonSave, setIsButtonSave] = useState(false); // изменение текста кнопки редактирования профиля
  const [loggedIn, setLoggedIn] = useState(false); // защита роутов
  const [allMovies, setAllMovies] = useState([]);  // карточки c сервера практикума
  const [currentUser, setCurrentUser] = useState(
    {
      name: 'Александр',
      email: 'pochta@yandex.ru',
      // _id: "633490f552e1e44d60014077"
    }
  );
  const [currentCard, setCurrentCard] = useState([]);  // карточки с сервера практикума отфильтрованные пользователем
  const [currentCardMain, setCurrentCardMain] = useState([]);  // карточки сохраненные пользователем
  const [currentCardSaved, setCurrentCardSaved] = useState([]);  // карточки сохраненные пользователем отфильтрованные пользователем
  const [isRequestDelCard, setIsRequestDelCard] = useState(false);    // прохождение запроса на удаление карточки
  const [isNavigateMovies, setIsNavigateMovies] = useState('');    // прохождение запроса на удаление карточки
  const [isDisabledInput, setIsDisabledInput] = useState(false);    // блокировка полей ввода

  const { register, login, checkToken } = useApiAuth();
 
  let navigate = useNavigate();

  // закрытие попапов
  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }
  function closeAllPopups () {
    setIsNavigationPopup(false);
  }

  //открытие попапа навигации при разрешении меньше 800px
  function handleOnPopupNavigation () {
    setIsNavigationPopup(true);
  }

  //отрисовка карточек при разных разрешениях экрана
  // console.log(constants);
  const [isQuantityCards, setIsQuantityCards] = useState(constants.NUMBER_CARD.average);
  function setQuantityCards (big, average, small) {
    if (window.screen.width > constants.KEY_SCREEN_SIZE.large) {setIsQuantityCards(big)};
    if (window.screen.width <= constants.KEY_SCREEN_SIZE.large && window.screen.width > constants.KEY_SCREEN_SIZE.small) {
      setIsQuantityCards(average)
    };
    if (window.screen.width <= constants.KEY_SCREEN_SIZE.small) {setIsQuantityCards(small)};
  }
  useEffect(()=> {
    function onQuantityCards () { 
      setQuantityCards (constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small)
    };
    window.onresize = onQuantityCards;
  })

  function handleOnClickButtonMore () {
    setQuantityCards (isQuantityCards+4, isQuantityCards+2, isQuantityCards+2)
  }

  // переход на роуты регистрации и авторизации
  function onClickPopupWithForm (name) {
    if (name === "Profile") {quitUser()};
    if (name === "Register") {navigate("/signin")};
    if (name === "Login") {navigate("/signup")};
  }

  // запрос карточек с сервера практикума, их сортировка и запись результатов поиска в localStorage
  const [valueInputMovie, setvalueInputMovie] = useState('') // value input поиска фильмов
  const [inputChecked, setInputChecked] = useState(false) // нажатие чекбокса
  const [isSearchMovie, setIsSearchMovie] = useState('') // сообщение ошибки запроса или нулевого поиска

  // localStorage.removeItem('arrMovies'); // удалить перед сдачей

  function calculateButtonMore () {
    if (currentCard) {
      if (currentCard.length > isQuantityCards)
      {setIsButtonMore(true)}
      else {setIsButtonMore(false)}
    }
  }
  useEffect(() => {calculateButtonMore()})

  function apiMovies () {
    moviesApi.getCards ()
      .then ((res, next) => {
        setAllMovies(res);
      })
      .catch((err) => {
        console.log(err);
        setIsRequestPassed(true);
        setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      });
  }
  useEffect(()=>{apiMovies()},[])

  function requestLocalStorage () {
    let inputValue = JSON.parse(localStorage.getItem('arrMovies'));
    // console.log(inputValue);
    if (inputValue !== null) {
      setvalueInputMovie(inputValue.valueInputMovie);
      setInputChecked(inputValue.checked);
      setCurrentCard(inputValue.arrMovies);
    }
  }
  useEffect(() => {requestLocalStorage ()},[allMovies, isNavigateMovies]);

  // отрисовка отфильтрованных карточек
  function renderingCard () {
    setIsNavigateMovies(false);
    setIsRequestPassed(false);
    setQuantityCards (constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small);
    setIsSearchMovie('');
    let arrMovies = [];
    setIsButtonMore(false);
    // moviesApi.getCards ()
    //   .then ((res, next) => {
      // console.log(valueInputMovie)
        if (valueInputMovie){
          // console.log(valueInputMovie);
          allMovies.map((c) => {
            if (c.nameRU.toLowerCase().includes(valueInputMovie.toLowerCase())) {
              if (inputChecked) {
                if (c.duration < constants.DURATION_SHORT_MOVIE) {arrMovies.push(c)};
              } else {arrMovies.push(c);}
            }
          })
          setCurrentCard(arrMovies);
          localStorage.setItem('arrMovies', JSON.stringify({
            arrMovies: arrMovies,
            valueInputMovie: valueInputMovie,
            checked: inputChecked
          }))
        }
      // })
      // .then (() => {
        // console.log(arrMovies);
        // setQuantityCards (16, 8, 5, setIsQuantityCards)
        // calculateButtonMore(arrMovies.length);
      // })
      // .finally (() => {
        setIsRequestPassed(true);
        if (arrMovies.length === 0){
          setIsSearchMovie('Ничего не найдено')
        } else { setIsSearchMovie('') }
      // })
      // .catch((err) => {
      //   console.log(err);
      //   setIsRequestPassed(true);
      //   setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      // });
  }
  useEffect(()=>{ renderingCard() },[allMovies])

  // отрисовка лайков на отфильтрованных карточках (вкладка фильмы)
  function requestCurrentCardMain () {
    setIsNavigateMovies(true)
    let arrMain=[]
    mainApi.getCards ()
      .then ((res)=>{
        res.forEach(c => {
          if (c.owner === currentUser._id) {
            arrMain.push(c)
          }
        });
        setCurrentCardMain(arrMain)
      })
  }
  useEffect(() => {requestCurrentCardMain()},[currentUser, currentCard]);

  // отрисовка отфильтрованных, сохраненных пользователем карточек
  function renderingSavedCard () {
    setQuantityCards (constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small)
    setIsSearchMovie('');
    let arrSavedMovies = [];
    setIsButtonMore(false);
    setCurrentCardSaved(currentCardMain)
    currentCardMain.map((c) => {
      if (valueInputMovie){
        if (c.nameRU.toLowerCase().includes(valueInputMovie.toLowerCase())) {
          if (inputChecked) {
            if (c.duration < constants.DURATION_SHORT_MOVIE) {arrSavedMovies.push(c)};
          } else {arrSavedMovies.push(c);}
      }} else {
        if (inputChecked) {
          if (c.duration < constants.DURATION_SHORT_MOVIE) {arrSavedMovies.push(c)};
        } else {arrSavedMovies.push(c);}
      }
      setCurrentCardSaved(arrSavedMovies);
    })
    if (arrSavedMovies.length === 0){setIsSearchMovie('Ничего не найдено')}
  }

  useEffect(()=>{renderingSavedCard()},[currentCardMain])
  
  // переход на страницы пользователем
  let urlRoute=window.location.pathname
  function redirect () {
    if (urlRoute === "/") {
      navigate("/");
      return;
    }
    if (urlRoute === "/movies" || urlRoute === "/signin" || urlRoute === "/signup") {
      navigate("/movies");
      return;
    }
    if (urlRoute === "/saved-movie") {
      navigate("/saved-movie");
      return;
    }
    if (urlRoute === '/profile') { 
      navigate("/profile");
      return;
    }
    navigate("/no-route");
  }

   function handleCheckToken () {
    checkToken () 
      .then((response) => {
        if (response.ok) {
          // console.log('ok-checkToken');
          // console.log(urlRoute)
          setLoggedIn(true);
          redirect();
          mainApi.getUser ()
            .then ((res) => {
              setCurrentUser(res);
            })
            .catch((err) => {console.log(err)});
          return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{ handleCheckToken() },[])

  // обновленние данных пользователя
  function updateUser (userData) {
    mainApi.patchUserInfo (userData)
      .then ((res) => {
        setCurrentUser(res);
        setIsButtonSave(true);
      })
      .finally(()=>{
        setIsDisabledInput(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка редактирования профиля');
      });
  }

  // console.log(`cardMain:`)
  // console.log(currentCardMain)
  // console.log(`cardSaved:`)
  // console.log(currentCardSaved)
  // console.log(currentUser)
  // console.log(currentCard)
  // console.log(valueInputMovie)

  // добавление карточки в сохраненные
  function handleAddCard (card) {
    mainApi.postAddCard (card)
      .then((res) => {
        setCurrentCardMain([res, ...currentCardMain])
      })
      .then (()=>{
        setIsRequestDelCard(true);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  // удаление карточки из сохраненных
  function handleCardDelete (card) {
    let cardId;
    let arrMain=currentCardMain;
    currentCardMain.map((c, index) => {
      if (c.movieId === card.id) {
        cardId = c._id
        arrMain.splice(index, 1)
      }
      if (!card.id) {
        if (c.movieId === card.movieId) {
          cardId = c._id
          arrMain.splice((index), 1)
        }
      }
    })
    mainApi.deleteCardDel(cardId)
      .then (()=>{
        setCurrentCardMain(arrMain)
      })
      .then (()=>{
        setIsRequestDelCard(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // регистрация, вход и выход пользователя
  function apiRegister (name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (!(res===undefined)) {
          // console.log(res.token)
          apiLogin(email, password)
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка регистрации');
      });
  }
  function apiLogin (email, password) {
    login(email, password)
      .then((res) => {
        if (!(res===undefined)) {
          localStorage.setItem('token', res.token);
          handleCheckToken();
        }
        return res;
      })
      .finally(()=>{
        setIsDisabledInput(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка входа');
      });
  }
  function quitUser () {
    localStorage.removeItem('token');
    localStorage.removeItem('arrMovies');
    setCurrentCard([]);
    setCurrentCardMain([]);
    setCurrentCardSaved([]);
    setvalueInputMovie('');
    setLoggedIn(false);
    navigate("/");
  }

  // изменение текста кнопки редактирования профиля
  function changeButtonSave () {
    setIsButtonSave(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <>
            <Main/>
            <Footer/>
          </>
        }/>
        <Route path="/movies" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header}
              isNavigationPopupOpen = {isNavigationPopupOpen} onPopupNavigation = {handleOnPopupNavigation}
              onClose = {closeAllPopups} onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              auth = {""}
              />
            <ProtectedRoute loggedIn={loggedIn} component={Movies}
              isQuantityCards={isQuantityCards}
              handleOnClickButtonMore={handleOnClickButtonMore}
              currentCard={currentCard} setCurrentCard={setCurrentCard}
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} setIsSearchMovie={setIsSearchMovie}
              renderingCard={renderingCard}
              setIsRequestPassed={setIsRequestPassed} isRequestPassed={isRequestPassed}
              isButtonMore={isButtonMore}
              isRequestDelCard={isRequestDelCard} setIsRequestDelCard={setIsRequestDelCard}
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
          </>
        }/>
        <Route path="/saved-movie" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header}
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              auth = {""}
            />
            <ProtectedRoute loggedIn={loggedIn} component={SavedMovies}
              isQuantityCards={isQuantityCards}
              setCurrentCard={setCurrentCard}
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} 
              setIsSearchMovie={setIsSearchMovie}
              renderingSavedCard={renderingSavedCard}
              isRequestPassed={isRequestPassed}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain} 
              currentCardSaved={currentCardSaved} 
              setCurrentCardSaved={setCurrentCardSaved}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
          </>
        }/>
        <Route path="/profile" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header}
               isNavigationPopupOpen = {isNavigationPopupOpen}
               onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
               onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              //  auth = {"Auth"}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Profile}
              onClickPopupWithForm={onClickPopupWithForm} updateUser={updateUser}
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
            />
          </>
        }/>
        <Route path="/signin" element={
          <>
            <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Disabled"}
              auth = {"Auth"}
            />
            <Login onClickPopupWithForm={onClickPopupWithForm} apiLogin={apiLogin} 
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
            />
          </>
        }/>
        <Route path="/signup" element={
          <>
            <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Disabled"}
              auth = {"Auth"}
            />
            <Register onClickPopupWithForm={onClickPopupWithForm} apiRegister={apiRegister}
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
            />
          </>
        }/>
        <Route path="/no-route" element={
          <>
            <NoRoute/>
          </>
        }/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
