import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

// function Header({ email, text, onSignOut, link }) {
function Header({ email, onSignOut, loggedIn }) {
  //  console.log(email, text, onSignOut, link)
  console.log(email)
  const { pathname } = useLocation();
  const link = `${pathname === '/signup' ? 'signin' : 'signup'}`;
  const text = `${pathname === '/signup' ? 'войти' : 'регистрация'}`;
  //  const text = pathname;

  //   function changeText() {
  //   switch (pathname) {
  //     case `${pathname === '/singup'}`: 'войти';
  //       break;

  //     case `${pathname === '/singin'}`: 'регистрация';
  //       break;

  //     default: 'выйти';
  //       break;
  //   }

  //   changeText();
  // }

  return (
    <header className="header">
      <a href="#" rel="noopener" className="logo"></a>
      {loggedIn
        ? (<>
          <p className="header__text">{email}</p>
          <p><Link to={link} className="header__text" onClick={onSignOut}>выйти</Link></p>
        </>
        ) : (<p><Link to={link} className="header__text" onClick={onSignOut}>{text}</Link></p>)
      }
    </header>
  );
}

export default Header;
