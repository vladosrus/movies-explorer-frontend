import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const formWithValidation = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    formWithValidation.resetForm();
    props.onUpdateProfileInfo(
      formWithValidation.values.name,
      formWithValidation.values.email
    );
  }

  return (
    <>
      <Header
        onNavigationBottomClick={props.onNavBottonClick}
        loggedIn={props.loggedIn}
      />
      <main>
        <article className="profile-page">
          <h2 className="profile-page__title">{`Привет, ${currentUser.name}!`}</h2>
          <form
            className="profile-page__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="profile-page__input-container">
              <label className="profile-page__input-name">
                Имя
                <input
                  name="name"
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                  className={`profile-page__input ${
                    formWithValidation.errors.name &&
                    "profile-page__input_type_error"
                  }`}
                  value={formWithValidation.values.name || ""}
                  onChange={formWithValidation.handleChange}
                />
              </label>
              <span
                className={`profile-page__error-message ${
                  formWithValidation.errors.name &&
                  "profile-page__error-message_visible"
                }`}
              >
                {formWithValidation.errors.name || ""}
              </span>
            </div>
            <div className="profile-page__input-container">
              <label className="profile-page__input-name">
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  className={`profile-page__input ${
                    formWithValidation.errors.email &&
                    "profile-page__input_type_error"
                  }`}
                  value={formWithValidation.values.email || ""}
                  onChange={formWithValidation.handleChange}
                />
              </label>
              <span
                className={`profile-page__error-message ${
                  formWithValidation.errors.name &&
                  "profile-page__error-message_visible"
                }`}
              >
                {formWithValidation.errors.email || ""}
              </span>
            </div>

            <button
              type="submit"
              disabled={
                (!formWithValidation.isValid ||
                  currentUser.name === formWithValidation.values.name) &&
                currentUser.email === formWithValidation.values.email
              }
              className={`profile-page__submit-button ${
                (!formWithValidation.isValid ||
                  currentUser.name === formWithValidation.values.name) &&
                currentUser.email === formWithValidation.values.email
                  ? "profile-page__submit-button_disabled"
                  : ""
              }`}
            >
              Редактировать
            </button>
          </form>
          <button
            type="button"
            className="profile-page__logout-button"
            onClick={props.onLogout}
          >
            Выйти из аккаунта
          </button>
        </article>
        <Navigation
          isOpen={props.isNavigationMenuOpen}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
        />
        <RequestStatusPopup
          isOpen={props.isRequestStatusPopupOpen}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
          code={200}
          message={"Фильм удалён"}
        />
      </main>
    </>
  );
}
