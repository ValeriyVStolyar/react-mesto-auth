import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header({ email, text, onSignOut, link }) {
  console.log(email, text, onSignOut, link)
  return (
    <header className="header">
      <a href="#" rel="noopener" className="logo"></a>
      <p className="header__text">{email}</p>
      <p><Link to={link} className="header__text" onClick={onSignOut}>{text}</Link></p>
    </header>
  );
}

export default Header;
