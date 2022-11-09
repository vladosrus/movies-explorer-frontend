import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";
import "./Navigation.css";

export default function Navigation(props) {
  return (
    <div
      className={`navigation-menu ${
        props.isOpen ? "navigation-menu_opened" : ""
      }`}
    >
      <div className="navigation-menu__container">
        <button
          className="navigation-menu__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <div className="navigation-menu__nav-links-container">
          <NavLink
            exact
            to="/"
            activeClassName="navigation-menu__nav-link_active"
            className="navigation-menu__nav-link"
            onClick={props.onClose}
          >
            Главная
          </NavLink>
          <NavLink
            exact
            to="/movies"
            activeClassName="navigation-menu__nav-link_active"
            className="navigation-menu__nav-link"
            onClick={props.onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            exact
            to="/saved-movies"
            activeClassName="navigation-menu__nav-link_active"
            className="navigation-menu__nav-link"
            onClick={props.onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <ProfileButton
          marginBottomClass={"profile-button_place_navigation-menu"}
        />
      </div>
    </div>
  );
}
