import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Header({ email, onSignOut, loggedIn }) {
  const { pathname } = useLocation();
  const link = `${pathname === '/signup' ? 'signin' : 'signup'}`;
  const text = `${pathname === '/signup' ? 'войти' : 'регистрация'}`;

  return (
    <header className="header">
      <a href="#" rel="noopener" className="logo"></a>
      {loggedIn
        ? (<ul className="header__list">
          <li className="header__text">{email}</li>
          <li className="header__text">
            <Link to={link} className="header__link" onClick={onSignOut}>выйти</Link>
          </li>
        </ul>
        ) : (<p className="header__text">
          <Link to={link} className="header__link" onClick={onSignOut}>{text}</Link>
        </p>)
      }
    </header>
  );
}

export default Header;
