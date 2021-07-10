import React, { Button } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'email@yandex.ru',
      password: 'somepassword',
      confirmPassword: 'somepassword'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
        e.preventDefault()
    if (this.state.password === this.state.confirmPassword){
      // сюда добавим логику обработки формы регистрации
      const { password, email } = this.state;
      auth.register(password, email);
    }
  }
  render(){
    return (
      <>
        <header className="header">
          <a href="#" rel="noopener" className="logo"></a>
          <p className="header__text">
            войти
      </p>
        </header>
        <main className="content">
          <section className="registration">
          <form onSubmit={this.handleSubmit} className="register__form">
            <h1 className="registration__title">регистрация</h1>
            <input id="registration__email" type="text" name="email" placeholder="Email"
              className="registration__input registration__input_type_email" minLength="2" maxLength="30" required />
            <span className="registration__input-error registration__email-error"></span>
            <input id="registration__password" type="password" name="password" placeholder="Пароль"
              className="registration__input registration__input_type_password" required />
            <span className="registration__input-error registration__password-error"></span>
            <button type="submit" aria-label="Сохранить"
              className="button button_type_login">зарегистрироваться</button>
            <p className="registration__subtitle">уже зарегистрированы&#63; Войти</p>
          </form>
          </section>

        </main>
      </>
    );
    }
}
<button type="" aria-label="Сохранить"
          className="button ">{save}</button>
export default Register;



    // return(
    //   <div className="register">
    //     <Logo title={'CryptoDucks'}/>
    //     <p className="register__welcome">
    //       Please register.
    //     </p>
    //     <form onSubmit={this.handleSubmit} className="register__form">
    //       <label htmlFor="username">
    //         Username:
    //       </label>
    //       <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
    //       <label htmlFor="email">
    //         Email:
    //       </label>
    //       <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
    //       <label htmlFor="password">
    //         Password:
    //       </label>
    //       <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
    //       <label htmlFor="confirmPassword">
    //         Confirm password:
    //       </label>
    //       <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
    //         <div className="register__button-container">
    //           <button type="submit" className="register__link">Sign up</button>
    //         </div>
    //     </form>
    //     <div className="register__signin">
    //       <p>Already a member?</p>
    //       <Link to="login" className="register__login-link">Log in here</Link>
    //     </div>
    //   </div>
    // )
