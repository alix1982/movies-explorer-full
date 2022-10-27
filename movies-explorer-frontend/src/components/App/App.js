import React from 'react';
import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import '../App.css';
// import moviesCards from '../../utils/moviesCards.js';

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

function App() {

  const [isNavigationPopupOpen, setIsNavigationPopup] = useState(false);
  const [isRequestPassed, setIsRequestPassed] = useState(false); //прохождение запроса карточек фильмов с сервера практикума
  const [isButtonMore, setIsButtonMore] = useState(false); // отрисовка кнопки "Ещё""
  const [loggedIn, setLoggedIn] = useState(false); // защита роутов
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
  const { register, login, checkToken } = useApiAuth();
 
  // useEffect(() => {setCurrentCardMain()},[currentCardMain])

  let navigate = useNavigate();

  // закрытие попапов
  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }
  function closeAllPopups () {
    setIsNavigationPopup(false);
    // setIsProfilePopup(false);
    // setIsAddPlacePopup(false);
    // setIsAvatarPopup(false);
    // setIsDeletePopup(false);
    // setIsRegisterSuccessOpen(false);
    // setIsRegisterSuccess({
    //   classIcon: 'popupInfoTooltip__iconNotSuccessfully',
    //   text: 'Что-то пошло не так! Попробуйте ещё раз.'
    // })
    // setSelectedCard({});
  }

  //открытие попапа навигации при разрешении меньше 800px
  function handleOnPopupNavigation () {
    setIsNavigationPopup(true);
  }

  //отрисовка карточек при разных разрешениях экрана
  const [isQuantityCards, setIsQuantityCards] = useState(8);
  function setQuantityCards (big, average, small) {
    if (window.screen.width > 800) {setIsQuantityCards(big)};
    if (window.screen.width <= 800 && window.screen.width > 400) {setIsQuantityCards(average)};
    if (window.screen.width <= 400) {setIsQuantityCards(small)};
  }
  useEffect(()=> {
    function onQuantityCards () { 
      setQuantityCards (16, 8, 5)
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
      // console.log(isButtonMore)
      // console.log(currentCard)
      // console.log(JSON.parse(localStorage.getItem('arrMovies')).arrMovies.length)
      // console.log(isQuantityCards)
    }
     
  }

  useEffect(() => {calculateButtonMore()})

  // отрисовка отфильтрованных карточек
  function renderingCard () {
    // setIsQuantityCards(5)
    // console.log(isQuantityCards)
    setQuantityCards (16, 8, 5)
    // console.log(isQuantityCards)
    setIsSearchMovie('');
    let arrMovies = [];
    setIsButtonMore(false);
    moviesApi.getCards ()
      .then ((res, next) => {
        if (valueInputMovie){
          res.map((c) => {
            if (c.nameRU.toLowerCase().includes(valueInputMovie.toLowerCase())) {
              if (inputChecked) {
                if (c.duration<40) {arrMovies.push(c)};
              } else {arrMovies.push(c);}
            }
          })
          setCurrentCard(arrMovies);
        }

      })
      .then (() => {
        // if (arrMovies.length === 0){setIsSearchMovie('Ничего не найдено')}
        // console.log(inputChecked)
        localStorage.setItem('arrMovies', JSON.stringify({
          arrMovies: arrMovies,
          valueInputMovie: valueInputMovie,
          checked: inputChecked
        }))
        // setQuantityCards (16, 8, 5, setIsQuantityCards)
        // calculateButtonMore(arrMovies.length);
       
      })
      .catch((err) => {
        console.log(err);
        setIsRequestPassed(true);
        setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      });
  }
  // отрисовка отфильтрованных, сохраненных пользователем карточек
  function renderingSavedCard () {
    setQuantityCards (16, 8, 5)
    setIsSearchMovie('');
    let arrSavedMovies = [];
    setIsButtonMore(false);
    // mainApi.getCards ()
    //   .then ((res, next) => {
    //     console.log(res)
        if (valueInputMovie){
          currentCardMain.map((c) => {
            if (c.nameRU.toLowerCase().includes(valueInputMovie.toLowerCase())) {
              if (inputChecked) {
                if (c.duration<40) {arrSavedMovies.push(c)};
              } else {arrSavedMovies.push(c);}
            }
          })
          setCurrentCardSaved(arrSavedMovies);
        }
        if (arrSavedMovies.length === 0){setIsSearchMovie('Ничего не найдено')}

      // })
      // .then (() => {
      //   if (arrSavedMovies.length === 0){setIsSearchMovie('Ничего не найдено')}
      // })
      // .catch((err) => {
      //   console.log(err);
      //   setIsRequestPassed(true);
      //   setIsSearchMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      // });
  }
  useEffect(()=>{renderingSavedCard()},[currentCardMain])

   function handleCheckToken () {
    checkToken () 
      .then((response) => {
        if (response.ok) {
          // console.log('ok');
          setLoggedIn(true);
          navigate("/movies");
          mainApi.getUser ()
            .then ((res) => {
              setCurrentUser(res);
            })
            // .then (()=>{
            //   setValues({
            //     email: currentUser.email,
            //     name: currentUser.name,
            //   })
            // })
            .catch((err) => {console.log(err)});
          return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    handleCheckToken();
  }, [])
  // обновленние данных пользователя
  function updateUser (currentUser) {
    mainApi.patchUserInfo (currentUser)
      .then ((res) => {
        setCurrentUser(res);
        closeAllPopups();
        navigate("/movies");
      })
      // .finally (() => {
      //   setTextButtonSubmit('Сохранение');
      // })
      .catch((err) => {
        console.log(err)
      })
  }

  // function handleCheckToken () {
  //   checkToken () 
  //     .then((response) => {
  //       if (response.ok) {
  //         setLoggedIn(true);
  //         navigate("/");
  //         api.getUser ()
  //           .then ((res) => { setCurrentUser(res) })
  //           .catch((err) => {console.log(err)});
  //         api.getCards ()
  //           .then ((res) => { setCurrentCard(res) })
  //           .catch((err) => {console.log(err)});
  //         return response.json()
  //       }
  //       return Promise.reject(`Ошибка: ${response.status}`);
  //     })
  //     .then((res) => {
  //       setUserEmail(res.email)
  //       return res;
  //     })
  //     .catch((err) => console.log(err)); 
  // }
  // useEffect(()=>{
  //   handleCheckToken();
  // }, [])
  
  // отрисовка лайков на отфильтрованных карточках (вкладка фильмы)
  function requestCurrentCardMain () {
    let arrMain=[]
    mainApi.getCards ()
      .then ((res)=>{
        console.log(`cardServer`)
        console.log(res)
        // console.log(res)
        // console.log(currentUser)
        res.forEach(c => {
          if (c.owner === currentUser._id) {
            arrMain.push(c)
          }
        });
        setCurrentCardMain(arrMain)
      })
  }
  useEffect(() => {requestCurrentCardMain()},[currentUser])
  // console.log(`cardMain:`)
  // console.log(currentCardMain)
  // console.log(`cardSaved:`)
  // console.log(currentCardSaved)
  // console.log(currentUser)
  
  // добавление карточки в сохраненные
  function handleAddCard (card) {
    mainApi.postAddCard (card)
      .then((res) => {
        setCurrentCardMain([res, ...currentCardMain])
      })
      .catch((err) => {
        console.log(err)
      });
    
  }

    // удаление карточки из сохраненных
  function handleCardDelete (card) {
    let cardId;
    let arrMain=currentCardMain;
    currentCardMain.map((c, index)=>{
      if (c.movieId === card.id) {
        cardId = c._id
        arrMain.splice(index, 1)
        setCurrentCardMain(arrMain)
        setCurrentCardSaved(arrMain)
      }
      if (!card.id) {
        if (c.movieId === card.movieId) {
          cardId = c._id
          arrMain.splice(index, 1)
          setCurrentCardMain(arrMain)
          setCurrentCardSaved(arrMain)
        }
      }
    })
    mainApi.deleteCardDel(cardId)
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
      .catch((err) => console.log(err));
  }
  function apiLogin (email, password) {
    login(email, password)
      .then((res) => {
        if (!(res===undefined)) {
          localStorage.setItem('token', res.token);
          handleCheckToken();
          // setUserEmail(email);
        }
        return res;
      })
      .catch((err) => console.log(err));
  }
  function quitUser () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/");
  }
  // function apiLogin (password, email) {
  //   register(password, email, '/signin', '/sign-in', setIsRegisterSuccessOpen, setIsRegisterSuccess)
  //     .then((res) => {
  //       if (!(res===undefined)) {
  //         localStorage.setItem('token', res.token);
  //         handleCheckToken();
  //         setUserEmail(email);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function apiRegister (password, email) {
  //   register(password, email, '/signup', '/sign-up', setIsRegisterSuccessOpen, setIsRegisterSuccess)
  //     .then((res) => {
  //       if (!(res===undefined)) {
  //         setIsRegisterSuccessOpen(true);
  //         setIsRegisterSuccess({
  //           classIcon: 'popupInfoTooltip__iconSuccessfully',
  //           text: 'Вы успешно зарегистрировались!'
  //         })
  //         navigate("/sign-in");
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function handleOnClick () {
  //   localStorage.removeItem('token');
  //   setLoggedIn(false);
  //   navigate("/sign-in");
  // }

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
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
            {/* <Header
              isNavigationPopupOpen = {isNavigationPopupOpen} onPopupNavigation = {handleOnPopupNavigation}
              onClose = {closeAllPopups} onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              auth = {""}
            /> */}
            {/* <Movies 
              isQuantityCards={isQuantityCards}
              handleOnClickButtonMore={handleOnClickButtonMore}
              currentCard={currentCard} setCurrentCard={setCurrentCard}
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} setIsSearchMovie={setIsSearchMovie}
              renderingCard={renderingCard}
              setIsRequestPassed={setIsRequestPassed} isRequestPassed={isRequestPassed}
              isButtonMore={isButtonMore}
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain}
              // setIsOnCardLike={setIsOnCardLike} isOnCardLike={isOnCardLike}
            /> */}
            {/* <Footer/> */}
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
              handleOnClickButtonMore={handleOnClickButtonMore}
              currentCard={currentCard} setCurrentCard={setCurrentCard}
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} setIsSearchMovie={setIsSearchMovie}
              renderingSavedCard={renderingSavedCard}
              setIsRequestPassed={setIsRequestPassed} isRequestPassed={isRequestPassed}
              isButtonMore={isButtonMore}
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain} setCurrentCardMain={setCurrentCardMain}
              currentCardSaved={currentCardSaved} setCurrentCardSaved={setCurrentCardSaved}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
            {/* <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              auth = {""}
            />
            <SavedMovies
              isQuantityCards={isQuantityCards}
              handleOnClickButtonMore={handleOnClickButtonMore}
              currentCard={currentCard} setCurrentCard={setCurrentCard}
              valueInputMovie={valueInputMovie} setvalueInputMovie={setvalueInputMovie}
              inputChecked={inputChecked} setInputChecked={setInputChecked}
              isSearchMovie={isSearchMovie} setIsSearchMovie={setIsSearchMovie}
              renderingSavedCard={renderingSavedCard}
              setIsRequestPassed={setIsRequestPassed} isRequestPassed={isRequestPassed}
              isButtonMore={isButtonMore}
              onCardLike = {handleAddCard}
              offCardLike={handleCardDelete}
              currentCardMain={currentCardMain} setCurrentCardMain={setCurrentCardMain}
              currentCardSaved={currentCardSaved} setCurrentCardSaved={setCurrentCardSaved}

              // setIsOnCardLike={setIsOnCardLike} isOnCardLike={isOnCardLike}
            />
            <Footer/> */}
          </>
        }/>
        <Route path="/profile" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header}
               isNavigationPopupOpen = {isNavigationPopupOpen}
               onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
               onCloseOverlay = {onCloseOverlay} offNavigation = {"Disabled"}
               auth = {"Auth"}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Profile}
              onClickPopupWithForm={onClickPopupWithForm} updateUser={updateUser}
            />
            {/* <Header
              isNavigationPopupOpen = {isNavigationPopupOpen}
              onPopupNavigation = {handleOnPopupNavigation} onClose = {closeAllPopups}
              onCloseOverlay = {onCloseOverlay} offNavigation = {"Enabled"}
              auth = {""}
            />
            <Profile onClickPopupWithForm={onClickPopupWithForm}/> */}
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
            <Login onClickPopupWithForm={onClickPopupWithForm} apiLogin={apiLogin}/>
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
            <Register onClickPopupWithForm={onClickPopupWithForm} apiRegister={apiRegister}/>
          </>
        }/>
        <Route path="/no-route" element={
          <>
            <NoRoute/>
          </>
        }/>
      </Routes>

      {/* <InfoTooltip classIcon={isRegisterSuccess.classIcon} text={isRegisterSuccess.text} 
        isOpen = {isRegisterSuccessOpen} 
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
      />

      <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        onUpdateUser = {handleUpdateUser}
        onTextButtonSubmit = {setTextButtonSubmit}
        onTextButton = {textButtonSubmit}
      />*/}
    </CurrentUserContext.Provider>
  );
}

export default App;
