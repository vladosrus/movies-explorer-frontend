import "./EntrancePage.css";
import Logo from "../Logo/Logo";

export default function EntrancePage(props) {
  return (
    <article className="entrance-page">
      <Logo />
      <h2 className="entrance-page__title">
        {props.name === "register" ? "Добро пожаловать!" : "Рады видеть!"}
      </h2>
      <form className="entrance-page__form">
        {props.name === "register" && (
          <div className="entrance-page__input-container">
            <label className="entrance-page__input-name">Имя</label>
            <input type="text" className="entrance-page__input"></input>
            <span className="entrance-page__error-message"></span>
          </div>
        )}
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            E-mail
            <input type="email" className="entrance-page__input"></input>
          </label>
          <span className="entrance-page__error-message"></span>
        </div>
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            Пароль
            <input
              type="password"
              className="entrance-page__input entrance-page__input_type_error"
            ></input>
          </label>
          <span className="entrance-page__error-message entrance-page__error-message_visible">
            Что-то пошло не так...
          </span>
        </div>
        <button
          type="submit"
          className={`entrance-page__submit-button ${
            props.name === "login" &&
            "entrance-page__submit-button_margin_large"
          }`}
        >
          {props.name === "register" ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <div className="entrance-page__caption-container">
        <p className="entrance-page__caption">
          {props.name === "register"
            ? "Уже зарегистрированы?"
            : "Ещё не зарегистрированы?"}

          {props.name === "register" ? (
            <a className="entrance-page__link" href="/sign-in">
              Войти
            </a>
          ) : (
            <a className="entrance-page__link" href="/sign-up">
              Регистрация
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
