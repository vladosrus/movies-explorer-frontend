import "./EntrancePage.css";
import Logo from "../Logo/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {
  nameValidationErrorMessage,
  emailValidationErrorMessage,
  passwordValidationErrorMessage,
} from "../../utils/constants";

export default function EntrancePage(props) {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.name === "register") {
      props.onRegistration(
        values.name,
        values.email,
        values.password,
        setIsFormDisabled
      );
      resetForm();
    } else {
      props.onLogin(values.email, values.password, setIsFormDisabled);
      resetForm();
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
                errors.name && "entrance-page__input_type_error"
              }`}
              value={values.name || ""}
              onChange={handleChange}
              disabled={isFormDisabled}
            ></input>
            <span
              className={`entrance-page__error-message ${
                errors.name && "entrance-page__error-message_visible"
              }`}
            >
              {nameValidationErrorMessage}
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
                errors.email && "entrance-page__input_type_error"
              }`}
              pattern=".+@.+\..+"
              value={values.email || ""}
              onChange={handleChange}
              disabled={isFormDisabled}
            ></input>
          </label>
          <span
            className={`entrance-page__error-message ${
              errors.email && "entrance-page__error-message_visible"
            }`}
          >
            {emailValidationErrorMessage}
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
                errors.password && "entrance-page__input_type_error"
              }`}
              value={values.password || ""}
              onChange={handleChange}
              disabled={isFormDisabled}
              pattern="^(?!.*[А-Я а-я]).{8,50}"
            ></input>
          </label>
          <span
            className={`entrance-page__error-message ${
              errors.password && "entrance-page__error-message_visible"
            }`}
          >
            {passwordValidationErrorMessage}
          </span>
        </div>
        <button
          type="submit"
          disabled={false}
          className={`entrance-page__submit-button ${
            props.name === "login"
              ? "entrance-page__submit-button_margin_large"
              : ""
          } ${isValid ? "" : "entrance-page__submit-button_disabled"}`}
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
            <Link to={"/sign-in"} className="entrance-page__link">
              Войти
            </Link>
          ) : (
            <Link to={"/sign-up"} className="entrance-page__link">
              Регистрация
            </Link>
          )}
        </p>
      </div>
    </article>
  );
}
