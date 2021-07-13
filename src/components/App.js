import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  //  React.useEffect(() => {
  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('token');
    console.log(jwt)
    if (jwt) {
      // проверим токен
      auth.getToken(jwt)
        .then((res) => {
          console.log(res)
          if (res) {
            // здесь можем получить данные пользователя!
            // const userData = {
            //   // password: res.username,
            //   // email: res.email
            //   // setEmail(res.email);
            // }
            // поместим их в стейт внутри App.js
            setLoggedIn(true);
            setEmail(res.data.email);
            console.log(res.data.email)
            history.push("/");
            // this.setState({
            //   loggedIn: true,
            //   userData
            // }, () => {
            //   history.push("/");
            // });
          }
        });
    }
  };
  //  }, [history]);
  tokenCheck();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  // const handleInfoTooltip = () => {
  //   setIsInfoTooltipPopupOpen(true);
  // }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(err => console.log('Ошибка. Запрос на получение инфо о пользователе не выполнен.'));
  }, [])

  useEffect(() => {
    api.getCards()
      .then((result) => {
        setCards(result);
      })
      .catch(err => console.log('Ошибка при получании карточек'));
  }, [])

  const handleUpdateUser = (user) => {
    api.setUserInfo(user)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка. Запрос на обновление профиля не выполнен.'));
  }

  const handleUpdateAvatar = (user) => {
    api.setUserAvatar(user)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка. Запрос на обновление профиля не выполнен.'));
  }


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => {
            return c._id === card._id ? newCard : c
          })
        });
      })
      .catch(err => console.log('Ошибка. Запрос на покраску лайка не выполнен.'));

    api.deleteLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log('Ошибка. Запрос на уменьшение лайка не выполнен.'));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        console.log()
        setCards(cards.filter(item =>
          item._id !== card._id)
        )
      })
      .catch(err => console.log('Ошибка. Запрос на удаление карточки не выполнен.'));
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка. Запрос на добавление карточки не выполнен.'));
  }

  const handleLogin = (password, email) => {
    // auth.authorize(password, email)
    // .then((result) => {
    //   console.log(result)
    // })
    // .catch(err => console.log('Ошибка. Запрос на вход не выполнен.'));
    setLoggedIn(true);
    console.log('вход выполнен');
    setIsInfoTooltipPopupOpen(true);
  }

  const handleRegister = (password, email) => {
    auth.register(password, email)
      .then((result) => {
        console.log(result)
      })
      .catch(err => console.log('Ошибка. Запрос на регистрацию не выполнен.'));
  }

  console.log(email)

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/singin');
    setEmail(false);
  }

  // tokenCheck();
  // console.log(tokenCheck())

  //   fetch(`https://auth.nomoreparties.co/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ password: '909@mail.ru', email: '909@mail.ru' })
  // })
  // fetch('https://auth.nomoreparties.co/signin', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     password: '12345435',
  //     email: '12345435@mail.ru',
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  //   data: {_id: "60e9cff0546906001995ebc1", email: "12345435@mail.ru"}
  // _{token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…wMjR9.3F_KoJYMhyr9FO0mdB6b21pXMWB-4bgRb6-_4dGZjQQ"}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        {/* ниже разместим защищённые маршруты */}
        {/* и передадим несколько пропсов: loggedIn, path, component */}

        <Header
          email={email}
        />
        <Switch>
          <ProtectedRoute exact path="/">
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          </ProtectedRoute>
          <Route path="/signin">
            {/* <Login {...props} onLogin={handleLogin} /> */}
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route >
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <PopupWithForm
          name="submition"
          title="вы уверены?"
          save="да"
        >
        </PopupWithForm>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

