import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  function handleChange(evt) {
    if (evt.target.id === "name") {
      setName(evt.target.value);
    } else {
      setEmail(evt.target.value);
    }
  }

  return (
    <>
      <Header onNavigationBottomClick={props.onNavBottonClick} loggedIn={props.loggedIn} />
      <main>
        <article className="profile-page">
          <h2 className="profile-page__title">{`Привет, ${currentUser.name}!`}</h2>
          <form className="profile-page__form">
            <div className="profile-page__input-container">
              <p className="profile-page__input-name">Имя</p>
              <input
                type="text"
                className="profile-page__input"
                value={name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profile-page__input-container">
              <p className="profile-page__input-name">E-mail</p>
              <input
                type="email"
                className="profile-page__input"
                value={email || ""}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="profile-page__submit-button">
              Редактировать
            </button>
          </form>
          <button type="submit" className="profile-page__logout-button">
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
