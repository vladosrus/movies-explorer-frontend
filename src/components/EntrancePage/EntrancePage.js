import "./EntrancePage.css";
import Logo from "../Logo/Logo";
import { useState } from "react";

export default function EntrancePage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(evt) {
    if (evt.target.id === "name") {
      setName(evt.target.value);
    } else if (evt.target.id === "email") {
      setEmail(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.name === "register") {
      props.onRegistration(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      props.onLogin(email, password);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <article className="entrance-page">
      <Logo />
      <h2 className="entrance-page__title">
        {props.name === "register" ? "Добро пожаловать!" : "Рады видеть!"}
      </h2>
      <form className="entrance-page__form" onSubmit={handleSubmit}>
        {props.name === "register" && (
          <div className="entrance-page__input-container">
            <label className="entrance-page__input-name">Имя</label>
            <input
              id="name"
              type="text"
              required
              minLength="2"
              maxLength="30"
              className="entrance-page__input"
              value={name || ""}
              onChange={handleChange}
            ></input>
            <span className="entrance-page__error-message"></span>
          </div>
        )}
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            E-mail
            <input
              id="email"
              type="email"
              required
              className="entrance-page__input"
              value={email || ""}
              onChange={handleChange}
            ></input>
          </label>
          <span className="entrance-page__error-message"></span>
        </div>
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            Пароль
            <input
              id="password"
              type="password"
              required
              className="entrance-page__input entrance-page__input_type_error"
              value={password || ""}
              onChange={handleChange}
            ></input>
          </label>
          <span className="entrance-page__error-message entrance-page__error-message_visible">
            Что-то пошло не так...
          </span>
        </div>
        <button
          type="submit"
          className={`entrance-page__submit-button ${
            props.name === "login"
              ? "entrance-page__submit-button_margin_large"
              : ""
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
