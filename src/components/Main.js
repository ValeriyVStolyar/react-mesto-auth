import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick,
  cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <img src={currentUser.avatar} alt="Аватар" className="profile__image" />
          <button type="button" aria-label="Открыть попап редактирования аватара"
            className="button button_type_edit-avatar" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" aria-label="Открыть попап"
            className="button button_type_edit" onClick={onEditProfile}>
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить карточку"
          className="button button_type_add-card" onClick={onAddPlace}>
        </button>
      </section>
      <section aria-label="Фотографии мест" className="places">
        {cards.map(card => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
          />
        )
        )}
      </section>
    </main>
  );
}

export default Main;
