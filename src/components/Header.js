import React from 'react';

function Header({ email }) {
  console.log(email)
  return (
    <header className="header">
      <a href="#" rel="noopener" className="logo"></a>
      <p className="header__text">{email}</p>
      <p className="header__text">войти</p>
    </header>
  );
}

export default Header;
