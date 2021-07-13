import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

// const [email, setEmail] = React.useState('');
// const [password, setPassword] = React.useState('');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: 'email1023980iuo@yandex.ru',
      email: '',
      // password: 'somepassword12343459',
      password: '',
      confirmPassword: 'somepassword12343459'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password === this.state.confirmPassword) {
      // сюда добавим логику обработки формы регистрации
      const { password, email } = this.state;
      auth.register(password, email)
        .then((res) => {
          console.log(res)
          if (res) {
            this.setState({
              message: ''
            }, () => {
              this.props.history.push('/singin');
            })
          } else {
            this.setState({
              message: 'Что-то пошло не так!'
            })
          }
        });
    }
  }
  render() {
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
                className="registration__input registration__input_type_email"
                minLength="2" maxLength="30" value={this.state.email} required onChange={this.handleChange} />
              <span className="registration__input-error registration__email-error"></span>
              <input id="registration__password" type="password" name="password" placeholder="Пароль"
                className="registration__input registration__input_type_password"
                value={this.state.password} required onChange={this.handleChange} />
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

export default withRouter(Register);
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
