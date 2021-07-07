import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, children, save, onSubmit }) {

  return (
    <article className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form action="#" method="POST" name={`Input-list-${name}`}
        className="popup__container popup__validate" onSubmit={onSubmit}>
        <button type="button" aria-label="Закрыть попап"
          className="button button_type_close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" aria-label="Сохранить"
          className="button button_type_submit">{save}</button>
      </form>
    </article>
  );
}

export default PopupWithForm;
