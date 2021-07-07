import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <article className={`popup popup_place_picture  ${card.link && "popup_opened"}`}>
      <form action="#" method="POST" name="Input-list" className="popup__container popup__container_size_large">
        <button type="button" aria-label="Закрыть попап" className="button button_type_close" onClick={onClose}></button>
        <img src={card.link} alt={`Картинка места с названием ${card.name}`} className="popup__image" />
        <h2 className="popup__title popup__title_size_small">{card.name}</h2>
      </form>
    </article>
  );
}

export default ImagePopup;
