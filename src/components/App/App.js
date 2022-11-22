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

  const [isSelectedShortMovies, setIsSelectedShortMovies] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  const [isSelectedShortSavedMovies, setIsSelectedShortSavedMovies] =
    useState(false);
  const [savedMovieName, setSavedMovieName] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltered, setIsFiltered] = useState();

  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const [isRequestStatusPopupOpen, setIsRequestStatusPopupOpen] =
    useState(false);

  const [isMoviesResultBlockOpen, setIsMoviesResultBlockOpen] = useState(false);
  const [
    isMoviesNotFoundErrorMessageVisible,
    setIsMoviesNotFoundErrorMessageVisible,
  ] = useState(false);
  const [isMoviesErrorMessageVisible, setIsMoviesErrorMessageVisible] =
    useState(false);
  const [isSavedMoviesResultBlockOpen, setIsSavedMoviesResultBlockOpen] =
    useState(true);
  const [
    isSavedMoviesNotFoundErrorMessageVisible,
    setIsSavedMoviesNotFoundErrorMessageVisible,
  ] = useState(false);
  const [
    isSavedMoviesErrorMessageVisible,
    setIsSavedMoviesErrorMessageVisible,
  ] = useState(false);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([MainApi.getProfileInfo(), MainApi.getSavedMovies()])
        .then(([currentUserInfo, savedMovies]) => {
          setCurrentUser(currentUserInfo);
          setSavedMovies(savedMovies);
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
      history.push("/movies");
    }
  }

  function registration(name, email, password, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.registration(name, email, password)
      .then((res) => {
        authorization(email, password);
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      })
      .finally(() => setIsFormDisabled(false));
  }

  function authorization(email, password, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.authorization(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        successAuthorization();
      })
      .catch((err) => {
        unsuccessAction();
        console.log(err);
      })
      .finally(() => setIsFormDisabled(false));
  }
  function updateProfileInfo(name, email, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.updateProfileInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFormDisabled(false);
      });
  }

  function filterMovies(allMovies, shortMovies, movieName) {
    if (shortMovies) {
      const filteredMovies = allMovies
        .filter((item) => {
          return item.duration <= 40;
        })
        .filter((item) => {
          return item.nameRU
            .toLowerCase()
            .trim()
            .includes(movieName.toLowerCase().trim());
        });
      return filteredMovies;
    } else {
      const filteredMovies = allMovies.filter((item) => {
        return item.nameRU
          .toLowerCase()
          .trim()
          .includes(movieName.toLowerCase().trim());
      });
      return filteredMovies;
    }
  }

  function handleFindMovies(
    isSelectedShortMovies,
    movieName,
    setIsFormDisabled
  ) {
    setIsFormDisabled(true);
    setIsSelectedShortMovies(isSelectedShortMovies);
    setMovieName(movieName);
    setIsMoviesResultBlockOpen(false);
    setIsMoviesErrorMessageVisible(false);
    setIsMoviesNotFoundErrorMessageVisible(false);
    MoviesApi.getMovies()
      .then((movies) => {
        const filterMoviesArray = filterMovies(
          movies,
          isSelectedShortMovies,
          movieName
        );
        if (filterMoviesArray.length > 0) {
          setIsMoviesResultBlockOpen(true);
          setFoundMovies(filterMoviesArray);
        } else {
          setFoundMovies(filterMoviesArray);
          setIsMoviesNotFoundErrorMessageVisible(true);
        }
      })
      .catch(() => {
        setIsMoviesErrorMessageVisible(true);
      })
      .finally(() => {
        setIsFormDisabled(false);
      });
  }
  function handleFindSavedMovies(isSelectedShortSavedMovies, savedMovieName) {
    setIsSelectedShortSavedMovies(isSelectedShortSavedMovies);
    setSavedMovieName(savedMovieName);
    setIsSavedMoviesResultBlockOpen(false);
    setIsSavedMoviesErrorMessageVisible(false);
    setIsSavedMoviesNotFoundErrorMessageVisible(false);
    const filterMoviesArray = filterMovies(
      savedMovies,
      isSelectedShortSavedMovies,
      savedMovieName
    );
    if (filterMoviesArray.length > 0) {
      setIsSavedMoviesResultBlockOpen(true);
      setFilteredMovies(filterMoviesArray);
      setIsFiltered(true);
    } else {
      setFilteredMovies(filterMoviesArray);
      setIsFiltered(true);
      setIsSavedMoviesNotFoundErrorMessageVisible(true);
    }
  }

  function handleDeleteMovie(movieId) {
    MainApi.deleteSavedMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movieId));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleLikeMovie(movie, isFavorites) {
    if (!isFavorites) {
      MainApi.createSavedMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      MainApi.deleteSavedMovie(
        savedMovies.filter((savedMovie) => savedMovie.movieId === movie.id)[0]
          ._id
      )
        .then(() => {
          setSavedMovies((state) =>
            state.filter((c) => c.movieId !== movie.id)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            <Main
              loggedIn={loggedIn}
              onNavigationBottomClick={handleNavigationBottomClick}
              onClose={closeAllWindows}
              isNavigationMenuOpen={isNavigationMenuOpen}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onNavBottonClick={handleNavigationBottomClick}
            onClose={closeAllWindows}
            isNavigationMenuOpen={isNavigationMenuOpen}
            isRequestStatusPopupOpen={isRequestStatusPopupOpen}
            isResultBlockOpen={isMoviesResultBlockOpen}
            isNotFoundErrorMessageVisible={isMoviesNotFoundErrorMessageVisible}
            isErrorMessageVisible={isMoviesErrorMessageVisible}
            onSubmitSearchForm={handleFindMovies}
            isSelectedShortMovies={isSelectedShortMovies}
            movieName={movieName}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            onMovieLike={handleLikeMovie}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onNavBottonClick={handleNavigationBottomClick}
            onClose={closeAllWindows}
            isNavigationMenuOpen={isNavigationMenuOpen}
            isRequestStatusPopupOpen={isRequestStatusPopupOpen}
            isResultBlockOpen={isSavedMoviesResultBlockOpen}
            isNotFoundErrorMessageVisible={
              isSavedMoviesNotFoundErrorMessageVisible
            }
            isErrorMessageVisible={isSavedMoviesErrorMessageVisible}
            onSubmitSearchForm={handleFindSavedMovies}
            isSelectedShortMovies={isSelectedShortSavedMovies}
            movieName={savedMovieName}
            savedMovies={savedMovies}
            filteredMovies={filteredMovies}
            isFiltered={isFiltered}
            onMovieDelete={handleDeleteMovie}
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
