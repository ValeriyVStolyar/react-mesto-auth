import React, { useState, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import popupSaccess from '../images/popup-union-success.svg';
import popupFail from '../images/popup-union-fail.svg';

function InfoTooltip({  }) {



  return (
    <section>
      <article className="popup popup_type_success popup_opened">
        <form action="#" method="POST" name="Input-list-places"
          className="popup__container popup__validate">
          <img src={popupSaccess} alt="Успешная регистрация" className="popup__image-result" />
          <button type="button" aria-label="Закрыть попап"
            // className="button button_type_close" onClick={onClose}></button>
            className="button button_type_close"></button>
          <h2 className="popup__title">вы успешно зарегистрировались&#33;</h2>
        </form>
      </article>
    </section>
    // <PopupWithForm
    //   name="avatar"
    //   title="обновить аватар"
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   save="Сохранить"
    //   onSubmit={handleSubmit}
    // >
    //   <input id="popup__avatar" type="url" name="avatar" placeholder="https://somewebsite.com/someimage.jpg"
    //     className="popup__input popup__input_type_avatar" required
    //     ref={avatarDom} />
    //   <span className="popup__input-error popup__avatar-error"></span>
    // </PopupWithForm>
  )
}

export default InfoTooltip;
