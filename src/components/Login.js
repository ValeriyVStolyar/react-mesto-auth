import React from 'react';
import { withRouter } from 'react-router-dom';


function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!password || !email) {
      return;
    }
    props.onLogin(password, email);
  }

  return (
    <main className="content">
      <section className="registration">
        <form onSubmit={handleSubmit} className="registration__form">
          <h1 className="registration__title">вход</h1>
          <input id="registration__email" type="text" name="email" placeholder="email@mail.com"
            className="registration__input registration__input_type_email" value={email}
            minLength="2" maxLength="30" required onChange={handleChangeEmail} />
          <span className="registration__input-error registration__email-error"></span>
          <input id="registration__password" type="password" name="password"
            placeholder="••••••••••" className="registration__input registration__input_type_password"
            value={password} required onChange={handleChangePassword} />
          <span className="registration__input-error registration__password-error"></span>
          <button type="submit" aria-label="Сохранить"
            className="button button_type_login">войти</button>
        </form>
      </section>
    </main>
  );
}

export default withRouter(Login);
