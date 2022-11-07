import "./Header.css";
import profileIcon from "../../images/header__profile-icon.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <Switch>
        <Route exact path="/">
          <nav className="header__nav-container header__nav-container_place_main-page">
            <div className="header__links-container">
              <Link to={"/sign-up"} className="header__link">
                Регистрация
              </Link>
            </div>
            <Link
              to={"/sign-in"}
              className="header__button header__button_name_login"
            >
              Войти
            </Link>
          </nav>
        </Route>
        <React.Fragment>
          <nav className="header__nav-container">
            <div className="header__links-container">
              <Link to={"/movies"} className="header__link">
                Фильмы
              </Link>
              <Link to={"/saved-movies"} className="header__link">
                Сохранённые фильмы
              </Link>
            </div>
            <Link
              to={"/profile"}
              className="header__button header__button_name_profile"
            >
              <img
                src={profileIcon}
                alt="Иконка профиля"
                className="header__profile-icon"
              ></img>
              Аккаунт
            </Link>
          </nav>
          <button type="button" className="header__menu-button" />
        </React.Fragment>
      </Switch>
    </header>
  );
}
