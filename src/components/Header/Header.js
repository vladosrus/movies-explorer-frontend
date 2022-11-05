import "./Header.css";
import logo from "../../images/header__logo.svg";
import profileIcon from "../../images/header__profile-icon.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={logo} alt="Логотип дипломного проекта" />
      </a>
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
        </React.Fragment>
      </Switch>
    </header>
  );
}
