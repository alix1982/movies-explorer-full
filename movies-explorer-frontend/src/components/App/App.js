// импорты для реакта
import React from 'react';
import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// импорт роутов
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

// дополнительный импорт
import { moviesApi } from '../../utils/MoviesApi.js';
import { mainApi } from '../../utils/MainApi.js';
import { useApiAuth } from '../../utils/ApiAuth.js';
import {useFormWithValidation} from '../formValidation.js';
import {CurrentUserContext, currentUserContext} from '../../contexts/CurrentUserContext.js';
import constants from '../../config.js';

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopup] = useState(false); // открытие попапа навигации
  const [isRequestPassed, setIsRequestPassed] = useState(false); //прохождение запроса карточек фильмов с сервера практикума
  const [isButtonMore, setIsButtonMore] = useState(false); // отрисовка кнопки "Ещё"
  const [isButtonSave, setIsButtonSave] = useState(false); // изменение текста кнопки редактирования профиля
  const [loggedIn, setLoggedIn] = useState(false); // защита роутов
  const [allMovies, setAllMovies] = useState([]);  // карточки c сервера практикума
  const [currentUser, setCurrentUser] = useState({name: 'Александр', email: 'pochta@yandex.ru',}); //первоначальные данные пользователя
  const [currentCard, setCurrentCard] = useState([]);  // карточки с сервера практикума отфильтрованные пользователем
  const [currentCardMain, setCurrentCardMain] = useState([]);  // карточки сохраненные пользователем
  const [currentCardSaved, setCurrentCardSaved] = useState([]);  // карточки сохраненные пользователем отфильтрованные пользователем
  const [isRequestDelCard, setIsRequestDelCard] = useState(false);    // прохождение запроса на удаление карточки
  const [isNavigateMovies, setIsNavigateMovies] = useState(false);    // переход между Фильмы и Сохраненные фильмы
  const [isDisabledInput, setIsDisabledInput] = useState(false);    // блокировка полей ввода
  const [isRequestLocalStorage, setIsRequestLocalStorage] = useState(false);    // прохождение запроса к localStorage
  const [valueInputMovie, setvalueInputMovie] = useState('') // value input поиска фильмов в Фильм
  const [valueInputMovieSaved, setvalueInputMovieSaved] = useState('') // value input поиска фильмов в Сохраненные фильмы
  const [inputChecked, setInputChecked] = useState(false) // нажатие чекбокса в Фильм
  const [inputCheckedSaved, setInputCheckedSaved] = useState(false) // нажатие чекбокса в Сохраненные фильмы
  const [isSearchMovie, setIsSearchMovie] = useState('') // сообщение ошибки запроса или нулевого поиска вкладки Фильмы
  const [isSearchMovieSaved, setIsSearchMovieSaved] = useState('') // сообщение нулевого поиска вкладки Сохраненные фильмы
  const [isFirstSubmitMovies, setIsFirstSubmitMovies] = useState(false) // первый сабмит во вкладке Фильмы
  
  const { values, errors, isValid, isValidInputs, setValues, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();
  const { register, login, checkToken } = useApiAuth();
  let navigate = useNavigate();

  // localStorage.removeItem('arrMovies');
  // console.log(`cardMain:`)
  // console.log(currentCardMain)
  // console.log(`cardSaved:`)
  // console.log(currentCardSaved)
  // console.log(currentUser)
  // console.log(currentCard)
  // console.log(valueInputMovie)
  // console.log(JSON.parse(localStorage.getItem('arrMovies')))
  // console.log(loggedIn)

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
  console.log(window.outerWidth)
  //отрисовка карточек при разных разрешениях экрана
  const [isQuantityCards, setIsQuantityCards] = useState(constants.NUMBER_CARD.average);
  function setQuantityCards (big, averageFirst, averageSecond, small) {
    if (window.outerWidth > constants.KEY_SCREEN_SIZE.large) {setIsQuantityCards(big)};
    if (window.outerWidth <= constants.KEY_SCREEN_SIZE.large && window.outerWidth > constants.KEY_SCREEN_SIZE.average) {
      setIsQuantityCards(averageFirst)
    };
    if (window.outerWidth <= constants.KEY_SCREEN_SIZE.average && window.outerWidth > constants.KEY_SCREEN_SIZE.small) {
      setIsQuantityCards(averageSecond)
    };
    if (window.outerWidth <= constants.KEY_SCREEN_SIZE.small) {setIsQuantityCards(small)};
  }
  useEffect(()=> {
    function onQuantityCards () { 
      setQuantityCards (
        constants.NUMBER_CARD.big, constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small
      )
    };
    window.onresize = onQuantityCards;
  })

  function handleOnClickButtonMore () {
    setQuantityCards (
      isQuantityCards+constants.NUMBER_CARD_MORE.big, 
      isQuantityCards+constants.NUMBER_CARD_MORE.average,
      isQuantityCards+constants.NUMBER_CARD_MORE.small,
      isQuantityCards+constants.NUMBER_CARD_MORE.small
    )
  }

  // переход на роуты регистрации и авторизации
  function onClickPopupWithForm (name) {
    if (name === "Profile") {quitUser()};
    if (name === "Register") {navigate("/signin")};
    if (name === "Login") {navigate("/signup")};
  }

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

  // показ кнопки Ещё в зависимости от количества отрисованных карточек
  function calculateButtonMore () {
    if (currentCard) {
      if (currentCard.length > isQuantityCards)
      {setIsButtonMore(true)}
      else {setIsButtonMore(false)}
    }
  }
  useEffect(() => {calculateButtonMore()})

  // изменение текста кнопки редактирования профиля
  function changeButtonSave () {
    setIsButtonSave(false)
  }

  // запись данных из localStorage
  function requestLocalStorage () {
    let inputValue = JSON.parse(localStorage.getItem('arrMovies'));
    if (inputValue !== null) {
      setCurrentCard(inputValue.arrMovies);
      setvalueInputMovie(inputValue.valueInputMovie);
      setInputChecked(inputValue.checked);
    }
    setIsRequestLocalStorage(true);
  }
  useEffect(() => {requestLocalStorage ()},[]);
  useEffect(() => {requestLocalStorage ()},[isNavigateMovies]);

  function filterMovies () {
    let arrMovies = [];
    if (!isFirstSubmitMovies) {
      return;
    }
    allMovies.map((c) => {
      if (c.nameRU.toLowerCase().includes(valueInputMovie.toLowerCase())) {
        if (inputChecked) {
          if (c.duration < constants.DURATION_SHORT_MOVIE) {arrMovies.push(c)};
        } else {arrMovies.push(c);}
      }
    })
    setCurrentCard(arrMovies)
    if (valueInputMovie) {
      localStorage.setItem('arrMovies', JSON.stringify({
        arrMovies: arrMovies,
        valueInputMovie: valueInputMovie,
        checked: inputChecked
      }))
    }
    if (arrMovies.length === 0 && isNavigateMovies === false){
      if (allMovies.length === 0) {setIsSearchMovie('')}
      else {setIsSearchMovie('Ничего не найдено')}
    } else { setIsSearchMovie('') }
  }
  useEffect(()=>{filterMovies()},[allMovies])

  // отрисовка отфильтрованных карточек во вкладка Фильмы
  function renderingCard () {
    setQuantityCards (
      constants.NUMBER_CARD.big, constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small
    );
    setIsButtonMore(false);
    if (valueInputMovie){
      if (!isFirstSubmitMovies) {
        filterMovies();
        return;
      }
      if (allMovies.length === 0) {
        setIsRequestPassed(true);
        moviesApi.getCards ()
          .then ((res, next) => {
            setAllMovies(res);
          })
          .then (()=>{
            filterMovies ()
          })
          .finally(()=>{setIsRequestPassed(false)})
          .catch((err) => {
            console.log(`Ошибка: ${err}`)
            if (err === 401) {
              setLoggedIn(false);
              quitUser();
            }
            setIsRequestPassed(false);
            setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
          });
      } else {filterMovies()}
    }
  }

  // отрисовка лайков на отфильтрованных карточках (вкладка фильмы)
  function requestCurrentCardMain () {
    let arrMain=[]
    if (currentCard.length !== 0) {
      mainApi.getCards ()
        .then ((res)=>{
          setIsRequestPassed(true)
          res.forEach(c => {
            if (c.owner === currentUser._id) {
              arrMain.push(c)
            }
          });
          setCurrentCardMain(arrMain)
        })
        .finally(()=>{setIsRequestPassed(false)})
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
          if (err === 401) {
            setLoggedIn(false);
            quitUser();
          }
          setIsRequestPassed(false);
          setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        });
    }
  }
  useEffect(() => {requestCurrentCardMain()},[currentUser, currentCard]);

  // отрисовка отфильтрованных, сохраненных пользователем карточек
  function renderingSavedCard () {
    setQuantityCards (
      constants.NUMBER_CARD.big, constants.NUMBER_CARD.big, constants.NUMBER_CARD.average, constants.NUMBER_CARD.small
    )
    let arrSavedMovies = [];
    setIsButtonMore(false);
    setCurrentCardSaved(currentCardMain);
    currentCardMain.map((c) => {
      if (valueInputMovieSaved){
        if (c.nameRU.toLowerCase().includes(valueInputMovieSaved.toLowerCase())) {
          if (inputCheckedSaved) {
            if (c.duration < constants.DURATION_SHORT_MOVIE) {arrSavedMovies.push(c)}
          } else {arrSavedMovies.push(c);}
        }
      } else {
        if (inputCheckedSaved) {
          if (c.duration < constants.DURATION_SHORT_MOVIE) {arrSavedMovies.push(c)}
        } else { arrSavedMovies = currentCardMain }
      }
      setCurrentCardSaved(arrSavedMovies);
    })
    if (arrSavedMovies.length === 0 && isNavigateMovies === true){
      setIsSearchMovieSaved('Ничего не найдено')
    } else { setIsSearchMovieSaved('') }
  }
  useEffect(()=>{renderingSavedCard()},[currentUser, currentCardMain])

  // проверка авторизации при загрузке и при эксплуатации
  function handleCheckToken () {
    checkToken () 
      .then((response) => {
        if (response.ok) {
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

  // запрос редактирования профиля
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
        console.log(`Ошибка: ${err}`)
        if (err === 401) {
          setLoggedIn(false);
          quitUser();
          return;
        }
        alert('Ошибка редактирования профиля');
      })
  }

  // добавление карточки в сохраненные
  function handleAddCard (card) {
    mainApi.postAddCard (card)
      .then((res) => {
        setCurrentCardMain([res, ...currentCardMain])
      })
      .then (()=>{
        setIsRequestDelCard(true);
      })
      .catch((err, res) => {
        console.log(`Ошибка: ${err}`)
        if (err === 401) {
          setLoggedIn(false);
          quitUser();
        }
      })
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
      .catch((err, res) => {
        console.log(`Ошибка: ${err}`)
        if (err === 401) {
          setLoggedIn(false);
          quitUser();
        }
      })
  }

  // регистрация, вход и выход пользователя
  function apiRegister (name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (!(res===undefined)) {
          apiLogin(email, password)
        }
        return res;
      })
      .finally(()=>{
        setIsDisabledInput(false);
        setIsValid(true);
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
        setIsValid(true);
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
    resetForm();
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <>
            <Main loggedIn={loggedIn}
              isNavigationPopupOpen = {isNavigationPopupOpen} onPopupNavigation = {handleOnPopupNavigation}
              onClose = {closeAllPopups} onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              isNavigateMovies={isNavigateMovies} setIsNavigateMovies={setIsNavigateMovies}
              auth = {"Main"} 
            />
            <Footer/>
          </>
        }/>
        <Route path="/movies" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header}
              isNavigationPopupOpen = {isNavigationPopupOpen} onPopupNavigation = {handleOnPopupNavigation}
              onClose = {closeAllPopups} onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              setIsNavigateMovies={setIsNavigateMovies}
              auth = {""}
              />
            <ProtectedRoute loggedIn={loggedIn} component={Movies}
              isQuantityCards={isQuantityCards}
              handleOnClickButtonMore={handleOnClickButtonMore}
              currentCard={currentCard} 
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              valueInputMovieSaved={valueInputMovieSaved} setvalueInputMovieSaved={setvalueInputMovieSaved}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} 
              isNavigateMovies={isNavigateMovies}
              renderingCard={renderingCard}
              isRequestPassed={isRequestPassed} setIsRequestPassed={setIsRequestPassed}
              isButtonMore={isButtonMore}
              isRequestDelCard={isRequestDelCard} setIsRequestDelCard={setIsRequestDelCard}
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain}
              setIsFirstSubmitMovies={setIsFirstSubmitMovies}
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
              setIsNavigateMovies={setIsNavigateMovies}
              auth = {""}
            />
            <ProtectedRoute loggedIn={loggedIn} component={SavedMovies}
              isQuantityCards={isQuantityCards}
              setvalueInputMovieSaved={setvalueInputMovieSaved}
              inputCheckedSaved={inputCheckedSaved} setInputCheckedSaved={setInputCheckedSaved}
              isSearchMovieSaved={isSearchMovieSaved} 
              isNavigateMovies={isNavigateMovies}
              renderingSavedCard={renderingSavedCard}
              isRequestPassed={isRequestPassed}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain} 
              currentCardSaved={currentCardSaved} setCurrentCardSaved={setCurrentCardSaved}
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
               setIsNavigateMovies={setIsNavigateMovies}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Profile}
              onClickPopupWithForm={onClickPopupWithForm} updateUser={updateUser}
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
              values={values} errors={errors} isValid={isValid} isValidInputs={isValidInputs} 
              setErrors={setErrors} setIsValid={setIsValid} setIsValidInputs={setIsValidInputs} 
              setValues={setValues} handleChange={handleChange} resetForm={resetForm}
            />
          </>
        }/>
        <Route path="/signin" element={
          <>
            <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Disabled"}
              setIsNavigateMovies={setIsNavigateMovies}
              auth = {"Auth"}
            />
            <Login onClickPopupWithForm={onClickPopupWithForm} apiLogin={apiLogin} 
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
              values={values} errors={errors} isValid={isValid} isValidInputs={isValidInputs} 
              setErrors={setErrors} setIsValid={setIsValid} setIsValidInputs={setIsValidInputs} 
              setValues={setValues} handleChange={handleChange} resetForm={resetForm}
            />
          </>
        }/>
        <Route path="/signup" element={
          <>
            <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Disabled"}
              setIsNavigateMovies={setIsNavigateMovies}
              auth = {"Auth"}
            />
            <Register onClickPopupWithForm={onClickPopupWithForm} apiRegister={apiRegister}
              isButtonSave={isButtonSave} changeButtonSave={changeButtonSave}
              isDisabledInput={isDisabledInput} setIsDisabledInput={setIsDisabledInput}
              values={values} errors={errors} isValid={isValid} isValidInputs={isValidInputs} 
              setErrors={setErrors} setIsValid={setIsValid} setIsValidInputs={setIsValidInputs} 
              setValues={setValues} handleChange={handleChange} resetForm={resetForm}
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
