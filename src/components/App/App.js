import "./App.css";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Импорты компонентов
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";

export default function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);

  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const [isRequestStatusPopupOpen, setIsRequestStatusPopupOpen] =
    useState(false);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([MainApi.getProfileInfo(), MoviesApi.getInitialMovies()])
        .then(([currentUserInfo, initialMovies]) => {
          setCurrentUser(currentUserInfo);
          setMovies(initialMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      history.push("/movies")
    }
  }

  function registration(name, email, password) {
    MainApi.registration(name, email, password)
      .then((res) => {
        authorization(email, password);
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      });
  }

  function authorization(email, password) {
    MainApi.authorization(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        successAuthorization();
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      });
  }
  function updateProfileInfo(name, email) {
    MainApi.updateProfileInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function successAuthorization() {
    setLoggedIn(true);
    history.push("/movies");
  }

  function handleLogout() {
    MainApi.logout()
      .then(() => {
        localStorage.clear("token");
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function unsuccessAction() {
    //setRegistrationPopupImg(unSuccessImg);
    //setRegistrationPopupText("Что-то пошло не так! Попробуйте ещё раз.");
    setIsRequestStatusPopupOpen(true);
  }

  function closeAllWindows() {
    setIsNavigationMenuOpen(false);
    setIsRequestStatusPopupOpen(false);
  }
  function handleNavigationBottomClick() {
    setIsNavigationMenuOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            onNavBottonClick={handleNavigationBottomClick}
            onClose={closeAllWindows}
            isNavigationMenuOpen={isNavigationMenuOpen}
            isRequestStatusPopupOpen={isRequestStatusPopupOpen}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={movies}
            onNavBottonClick={handleNavigationBottomClick}
            onClose={closeAllWindows}
            isNavigationMenuOpen={isNavigationMenuOpen}
            isRequestStatusPopupOpen={isRequestStatusPopupOpen}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onNavBottonClick={handleNavigationBottomClick}
            onClose={closeAllWindows}
            isNavigationMenuOpen={isNavigationMenuOpen}
            isRequestStatusPopupOpen={isRequestStatusPopupOpen}
            onLogout={handleLogout}
            onUpdateProfileInfo={updateProfileInfo}
          />
          <Route exact path="/sign-up">
            <Register
              isRequestStatusPopupOpen={isRequestStatusPopupOpen}
              onClose={closeAllWindows}
              onRegistration={registration}
            />
          </Route>
          <Route exact path="/sign-in">
            <Login
              isRequestStatusPopupOpen={isRequestStatusPopupOpen}
              onClose={closeAllWindows}
              onLogin={authorization}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
