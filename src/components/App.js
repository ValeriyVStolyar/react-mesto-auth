import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from "react-router-dom";
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

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const[loggedIn, setLoggedIn] = React.useState(false);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        {/* ниже разместим защищённые маршруты */}
        {/* и передадим несколько пропсов: loggedIn, path, component */}
      {/* <Switch>
        <ProtectedRoute
          path="/ducks"
          loggedIn={loggedIn}
          component={Main}
        />
        <ProtectedRoute
          path="/my-profile"
          loggedIn={loggedIn}
          component={Header}
        />
        <Route path="/login">
          <div className="loginContainer">
            <Login handleLogin={this.handleLogin} />
          </div>
        </Route>
        <Route path="/register">
          <div className="registerContainer">
            <Register />
          </div>
        </Route>
        <Route>
          {loggedIn ? (
            <Redirect to="/ducks" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/">
          {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/sing-in" />}
        </Route>

      </Switch> */}

        <Header />
        <Switch>
          <ProtectedRoute path="/reg">
            loggedIn={loggedIn}
            component={Register}
          </ProtectedRoute>
          <ProtectedRoute path="/pop">
            loggedIn={loggedIn}
            component={InfoTooltip}
          </ProtectedRoute>
          <Route path="/first">
            <Header />
          </Route>
          <Route path="/second">
            <Footer />
          </Route>
          <Route >
            {loggedIn ? <Redirect to="/reg" /> : <Redirect to="/second" />}
          </Route>
        </Switch>

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

