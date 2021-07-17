import React, { useState, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarDom = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarDom.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      save="Сохранить"
      onSubmit={handleSubmit}
    >
      <input id="popup__avatar" type="url" name="avatar" placeholder="https://somewebsite.com/someimage.jpg"
        className="popup__input popup__input_type_avatar" required
        ref={avatarDom} />
      <span className="popup__input-error popup__avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
