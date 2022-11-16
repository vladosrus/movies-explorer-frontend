import "./EntrancePage.css";
import Logo from "../Logo/Logo";
//import { useState } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function EntrancePage(props) {
  const formInputs = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.name === "register") {
      props.onRegistration(
        formInputs.values.name,
        formInputs.values.email,
        formInputs.values.password
      );
      formInputs.resetForm();
    } else {
      props.onLogin(formInputs.values.email, formInputs.values.password);
      formInputs.resetForm();
    }
  }

  return (
    <article className="entrance-page">
      <Logo />
      <h2 className="entrance-page__title">
        {props.name === "register" ? "Добро пожаловать!" : "Рады видеть!"}
      </h2>
      <form className="entrance-page__form" onSubmit={handleSubmit} noValidate>
        {props.name === "register" && (
          <div className="entrance-page__input-container">
            <label className="entrance-page__input-name">Имя</label>
            <input
              name="name"
              type="text"
              required
              minLength="2"
              maxLength="30"
              className={`entrance-page__input ${
                formInputs.errors.name && "entrance-page__input_type_error"
              }`}
              value={formInputs.values.name || ""}
              onChange={formInputs.handleChange}
            ></input>
            <span
              className={`entrance-page__error-message ${
                formInputs.errors.name && "entrance-page__error-message_visible"
              }`}
            >
              {formInputs.errors.name || ""}
            </span>
          </div>
        )}
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            E-mail
            <input
              name="email"
              type="email"
              required
              className={`entrance-page__input ${
                formInputs.errors.email && "entrance-page__input_type_error"
              }`}
              value={formInputs.values.email || ""}
              onChange={formInputs.handleChange}
            ></input>
          </label>
          <span
            className={`entrance-page__error-message ${
              formInputs.errors.email && "entrance-page__error-message_visible"
            }`}
          >
            {formInputs.errors.email || ""}
          </span>
        </div>
        <div className="entrance-page__input-container">
          <label className="entrance-page__input-name">
            Пароль
            <input
              name="password"
              type="password"
              required
              className={`entrance-page__input ${
                formInputs.errors.password && "entrance-page__input_type_error"
              }`}
              value={formInputs.values.password || ""}
              onChange={formInputs.handleChange}
            ></input>
          </label>
          <span
            className={`entrance-page__error-message ${
              formInputs.errors.password &&
              "entrance-page__error-message_visible"
            }`}
          >
            {formInputs.errors.password || ""}
          </span>
        </div>
        <button
          type="submit"
          disabled={false}
          className={`entrance-page__submit-button ${
            props.name === "login"
              ? "entrance-page__submit-button_margin_large"
              : ""
          } ${
            formInputs.isValid ? "" : "entrance-page__submit-button_disabled"
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
