import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";
import "./Navigation.css";

export default function Navigation(props) {
  // Закрытие меню на esc
  if (props.isOpen) {
    document.addEventListener(
      "keydown",
      (evt) => {
        if (evt.key === "Escape") {
          props.onClose();
        }
      },
      { once: true }
    );
  }

  return (
    <div
      className={`navigation-menu ${
        props.isOpen ? "navigation-menu_opened" : ""
      }`}
    >
      <div
        className="navigation-menu__overlay"
        onClick={props.onOverlayClick}
      ></div>
      <div className="navigation-menu__container">
        <button
          className="navigation-menu__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <nav className="navigation-menu__nav-links-container">
          <NavLink
            to="/diploma/"
            className={({ isActive }) =>
              isActive
                ? "navigation-menu__nav-link navigation-menu__nav-link_active"
                : "navigation-menu__nav-link"
            }
            onClick={props.onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/diploma/movies"
            className={({ isActive }) =>
              isActive
                ? "navigation-menu__nav-link navigation-menu__nav-link_active"
                : "navigation-menu__nav-link"
            }
            onClick={props.onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/diploma/saved-movies"
            className={({ isActive }) =>
              isActive
                ? "navigation-menu__nav-link navigation-menu__nav-link_active"
                : "navigation-menu__nav-link"
            }
            onClick={props.onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <ProfileButton
          marginBottomClass={"profile-button_place_navigation-menu"}
          onClose={props.onClose}
        />
      </div>
    </div>
  );
}
