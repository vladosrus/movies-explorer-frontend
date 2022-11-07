import "./Header.css";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Logo from "../Logo/Logo";
import ProfileButton from "../ProfileButton/ProfileButton";

export default function Header(props) {
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
            <ProfileButton />
          </nav>
          <button type="button" className="header__menu-button" onClick={props.onNavigationBottomClick} />
        </React.Fragment>
      </Switch>
    </header>
  );
}
