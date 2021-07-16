import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
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
    if (!this.state.password || !this.state.email) {
      return;
    }
    // сюда добавим логику обработки формы регистрации
    const { password, email } = this.state;
    // auth.register(password, email)
    //   .then((res) => {
    //     console.log(res)
    this.props.onRegister(password, email);

    // if (res) {
    //   this.setState({
    //     message: 'Супер'
    //   }, () => {
    //     this.props.onRegister(password, email);
    //     this.props.history.push('/signin');
    //   })
    // } else {
    //   this.setState({
    //     message: 'Что-то пошло не так!'

    //   }, () => {
    //     this.props.onRegister(password, email);
    //   })
    // }
    //      });
  }
  render() {
    return (
      <>
        <main className="content">
          <section className="registration">
            <form onSubmit={this.handleSubmit} className="registration__form">
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
              <p><Link to="singin" className="registration__subtitle">уже зарегистрированы&#63; Войти</Link></p>
            </form>
          </section>
        </main>
      </>
    );
  }
}

export default withRouter(Register);
