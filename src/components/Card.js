import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button button_type_remove ${isOwn ? 'button_type_remove' : 'button_disabled'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button button_type_like ${isLiked ? 'button_clicked' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      <button type="button" aria-label="Удалить"
        className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={card.link} alt={`Картинка места с названием
      ${card.name}`} className="place__image" onClick={handleClick} />
      <div className="place__list-sights">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-conteiner">
          <button type="button" aria-label="Лайкнуть"
            className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="place__text">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
