import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { useState } from "react";

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

  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });
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
      history.push("/");
    }
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
          />
          <Route exact path="/sign-up">
            <Register
              isRequestStatusPopupOpen={isRequestStatusPopupOpen}
              onClose={closeAllWindows}
            />
          </Route>
          <Route exact path="/sign-in">
            <Login
              isRequestStatusPopupOpen={isRequestStatusPopupOpen}
              onClose={closeAllWindows}
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
