import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';
import Header from './Header';
// import App from './App';

// const [email, setEmail] = React.useState('');
// const [password, setPassword] = React.useState('');

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  // this.state = {
  //   email: '',
  //   password: '',
  //   confirmPassword: 'somepassword12343459'
  // }


  function handleChangeEmail(e) {
    // const { name, value } = e.target;
    // this.setState({
    //   [name]: value
    // });
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
    // сюда добавим логику обработки формы регистрации
    // const { password, email } = this.state;
    auth.authorize(password, email)
      .then((res) => {
        console.log(res)
        if (res.token) {
          console.log(password)
          console.log(email)
          // email('');
          // password('');
          // console.log(password)
          // console.log(email)
          //  console.log(props.handleLogin())
          props.onLogin(password, email);
          props.history.push('/');
          console.log('вход')

        }
      });
  }

  return (
    <>
      <Header
        text={'регистрация'}
        link={'signup'}
        email={email}
      />
      <main className="content">
        <section className="registration">
          <form onSubmit={handleSubmit} className="register__form">
            <h1 className="registration__title">вход</h1>
            <input id="registration__email" type="text" name="email" placeholder="email@mail.com"
              className="registration__input registration__input_type_email" value={email}
              minLength="2" maxLength="30" required onChange={handleChangeEmail} />
            {/* minLength="2" maxLength="30" required /> */}
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
    </>
  );
}

// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       confirmPassword: 'somepassword12343459'
//     }

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }

// handleSubmit(e){
//   e.preventDefault()
// if (!this.state.password || !this.state.email){
//   return;
// }
// // сюда добавим логику обработки формы регистрации
// const { password, email } = this.state;
// auth.authorize(this.state.password, this.state.email)
// .then((res) => {
// console.log(res)
//   if (res.token){
//     console.log(this.state.password)
//     console.log(this.state.email)
//     this.setState({ password: '', email: '' },() => {
//       console.log(this.state.password)
//       console.log(this.state.email)
//       console.log(this.props.handleLogin())
//       this.props.onLogin(this.state.password, this.state.email);
//       this.props.history.push('/');
//     })
//   }
// });
// }

//   render(){
//     return (
//       <>
//         <header className="header">
//           <a href="#" rel="noopener" className="logo"></a>
//           <p className="header__text">
//             регистрация
//       </p>
//         </header>
//         <main className="content">
//           <section className="registration">
//           <form onSubmit={this.handleSubmit} className="register__form">
//             <h1 className="registration__title">вход</h1>
//             <input id="registration__email" type="text" name="email" placeholder="email@mail.com"
//               className="registration__input registration__input_type_email" value={this.state.email}
//               minLength="2" maxLength="30" required onChange={this.handleChange} />
//               {/* minLength="2" maxLength="30" required /> */}
//             <span className="registration__input-error registration__email-error"></span>
//             <input id="registration__password" type="password" name="password"
//             placeholder="••••••••••" className="registration__input registration__input_type_password"
//             value={this.state.password} required onChange={this.handleChange} />
//             <span className="registration__input-error registration__password-error"></span>
//             <button type="submit" aria-label="Сохранить"
//               className="button button_type_login">войти</button>
//           </form>
//           </section>

//         </main>
//       </>
//     );
//     }
// }

export default withRouter(Login);
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
