import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route, useHistory, withRouter } from "react-router-dom";
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
  const [isSuccess, setIsSuccess] = React.useState(false);
  // ({
  //   succesText: 'что-то пошло не так! Попробуйте ещё раз.',
  //   succesIcon: ''
  // });

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

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

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

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

  const checkToken = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => console.log('Ошибка. Запрос на проверку токена не выполнен.'));
    }
  }

  const handleLogin = (password, email) => {
    auth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push('/');
          checkToken();
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос на вход не выполнен.')
      });

  }

  const handleRegister = (password, email) => {
    auth.register(password, email)
      .then((result) => {
        if (result) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос на регистрацию не выполнен.')
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  React.useEffect(() => {
    checkToken();
  }, [history]);

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/signin');
    setEmail(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={signOut}
        />
        <Switch>
          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/signin">
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
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
