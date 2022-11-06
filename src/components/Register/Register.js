import "./Register.css";
import Logo from "../Logo/Logo";

export default function Register() {
  return (
    <article className="registration-page">
      <Logo />
      <h2 className="registration-page__title">Добро пожаловать!</h2>
      <form className="registration-page__form">
        <div className="registration-page__input-container">
          <label className="registration-page__input-name">Имя</label>
          <input type="text" className="registration-page__input"></input>
          <span className="registration-page__error-message"></span>
        </div>
        <div className="registration-page__input-container">
          <label className="registration-page__input-name">
            E-mail
            <input type="email" className="registration-page__input"></input>
          </label>
          <span className="registration-page__error-message"></span>
        </div>
        <div className="registration-page__input-container">
          <label className="registration-page__input-name">
            Пароль
            <input
              type="password"
              className="registration-page__input registration-page__input_type_error"
            ></input>
          </label>
          <span className="registration-page__error-message registration-page__error-message_visible">
            Что-то пошло не так...
          </span>
        </div>
        <button type="submit" className="registration-page__submit-button">
          Зарегистрироваться
        </button>
      </form>
      <div className="registration-page__caption-container">
        <p className="registration-page__caption">
          Уже зарегистрированы?
          <a class="registration-page__link" href="/sign-in">
            Войти
          </a>
        </p>
      </div>
    </article>
  );
}
