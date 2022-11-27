import "./App.css";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

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
import errorMessage from "../../utils/constants";

export default function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);

  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);

  const [isSelectedShortMovies, setIsSelectedShortMovies] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [isMoviesResultBlockOpen, setIsMoviesResultBlockOpen] = useState(false);
  const [
    isMoviesNotFoundErrorMessageVisible,
    setIsMoviesNotFoundErrorMessageVisible,
  ] = useState(false);
  const [isMoviesErrorMessageVisible, setIsMoviesErrorMessageVisible] =
    useState(false);

  const [isSelectedShortSavedMovies, setIsSelectedShortSavedMovies] =
    useState(false);
  const [savedMovieName, setSavedMovieName] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltered, setIsFiltered] = useState();
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

  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const [isRequestStatusPopupOpen, setIsRequestStatusPopupOpen] =
    useState(false);
  const [isRequestPopupSuccess, setIsRequestPopupSuccess] = useState(false);
  const [requestStatusPopupMessage, setRequestStatusPopupMessage] = useState();

  const tokenCheck = useCallback(
    () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
        // history.push("/movies");
      }
    },
    [
      /*history*/
    ]
  );

  const localStorageCheck = useCallback(() => {
    localStorage.isSelectedShortMovies &&
      setIsSelectedShortMovies(JSON.parse(localStorage.isSelectedShortMovies));
    localStorage.movieName && setMovieName(localStorage.movieName);
    localStorage.movies && setFoundMovies(JSON.parse(localStorage.movies));
    localStorage.isMoviesResultBlockOpen &&
      setIsMoviesResultBlockOpen(
        JSON.parse(localStorage.isMoviesResultBlockOpen)
      );
    localStorage.isMoviesNotFoundErrorMessageVisible &&
      setIsMoviesNotFoundErrorMessageVisible(
        JSON.parse(localStorage.isMoviesNotFoundErrorMessageVisible)
      );
  }, []);

  useEffect(() => {
    tokenCheck();
    localStorageCheck();
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
  }, [loggedIn, tokenCheck, localStorageCheck]);

  function registration(name, email, password, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.registration(name, email, password)
      .then(() => {
        authorization(email, password, setIsFormDisabled);
      })
      .catch((promise) => {
        promise
          .then((err) => {
            console.log(err.message);
            err.statusCode && err.statusCode === 400
              ? requestStatusPopupAction(err.validation.body.message, false)
              : requestStatusPopupAction(err.message, false);
          })
          .catch((err) => console.log(err));
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
      .catch((promise) => {
        promise
          .then((err) => {
            console.log(err.message);
            err.statusCode && err.statusCode === 400
              ? requestStatusPopupAction(err.validation.body.message, false)
              : requestStatusPopupAction(err.message, false);
          })
          .catch((err) => console.log(err));
      })
      .finally(() => setIsFormDisabled(false));
  }
  function updateProfileInfo(name, email, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.updateProfileInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        requestStatusPopupAction("Данные успешно обновлены", true);
      })
      .catch((promise) => {
        promise
          .then((err) => {
            console.log(err.message);
            err.statusCode && err.statusCode === 400
              ? requestStatusPopupAction(err.validation.body.message, false)
              : requestStatusPopupAction(err.message, false);
          })
          .catch((err) => console.log(err));
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
    localStorage.setItem("isSelectedShortMovies", isSelectedShortMovies);
    localStorage.setItem("movieName", movieName);
    localStorage.setItem("movies", JSON.stringify([]));
    localStorage.setItem("isMoviesResultBlockOpen", false);
    localStorage.setItem("isMoviesNotFoundErrorMessageVisible", false);

    if (beatfilmMovies.length === 0) {
      setIsPreloaderOpen(true);
      MoviesApi.getMovies()
        .then((movies) => {
          setBeatfilmMovies(movies);
          const filterMoviesArray = filterMovies(
            movies,
            isSelectedShortMovies,
            movieName
          );
          if (filterMoviesArray.length > 0) {
            setIsMoviesResultBlockOpen(true);
            setFoundMovies(filterMoviesArray);
            localStorage.isMoviesResultBlockOpen = true;
            localStorage.movies = JSON.stringify(filterMoviesArray);
          } else {
            setFoundMovies(filterMoviesArray);
            setIsMoviesNotFoundErrorMessageVisible(true);
            localStorage.movies = JSON.stringify(filterMoviesArray);
            localStorage.isMoviesNotFoundErrorMessageVisible = true;
          }
        })
        .catch(() => {
          setIsMoviesErrorMessageVisible(true);
        })
        .finally(() => {
          setIsFormDisabled(false);
          setIsPreloaderOpen(false);
        });
    } else {
      const filterMoviesArray = filterMovies(
        beatfilmMovies,
        isSelectedShortMovies,
        movieName
      );
      if (filterMoviesArray.length > 0) {
        setIsMoviesResultBlockOpen(true);
        setFoundMovies(filterMoviesArray);
        setIsFormDisabled(false);
        localStorage.movies = JSON.stringify(filterMoviesArray);
        localStorage.isMoviesResultBlockOpen = true;
      } else {
        setFoundMovies(filterMoviesArray);
        setIsMoviesNotFoundErrorMessageVisible(true);
        setIsFormDisabled(false);
        localStorage.movies = JSON.stringify(filterMoviesArray);
        localStorage.isMoviesNotFoundErrorMessageVisible = true;
      }
    }
  }
  function handleFindSavedMovies(isSelectedShortSavedMovies, savedMovieName) {
    setIsSelectedShortSavedMovies(isSelectedShortSavedMovies);
    setSavedMovieName(savedMovieName);
    setIsSavedMoviesResultBlockOpen(false);
    setIsSavedMoviesErrorMessageVisible(false);
    setIsSavedMoviesNotFoundErrorMessageVisible(false);

    const filterSavedMoviesArray = filterMovies(
      savedMovies,
      isSelectedShortSavedMovies,
      savedMovieName
    );
    if (filterSavedMoviesArray.length > 0) {
      setIsSavedMoviesResultBlockOpen(true);
      setFilteredMovies(filterSavedMoviesArray);
      setIsFiltered(true);
    } else {
      setFilteredMovies(filterSavedMoviesArray);
      setIsFiltered(true);
      setIsSavedMoviesNotFoundErrorMessageVisible(true);
    }
  }

  function handleDeleteMovie(movieId) {
    MainApi.deleteSavedMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movieId));
        setFilteredMovies((state) => state.filter((c) => c._id !== movieId));
      })
      .catch((error) => {
        console.log(error);
        requestStatusPopupAction(errorMessage, false);
      });
  }
  function handleLikeMovie(movie, isFavorites, setIsFavorites) {
    if (!isFavorites) {
      MainApi.createSavedMovie(movie)
        .then((savedMovie) => {
          setIsFavorites(true);
          setSavedMovies([savedMovie, ...savedMovies]);
          setFilteredMovies([savedMovie, ...savedMovies]);
        })
        .catch((error) => {
          console.log(error);
          requestStatusPopupAction(errorMessage, false);
        });
    } else {
      MainApi.deleteSavedMovie(
        savedMovies.filter((savedMovie) => savedMovie.movieId === movie.id)[0]
          ._id
      )
        .then(() => {
          setIsFavorites(false);
          setSavedMovies((state) =>
            state.filter((c) => c.movieId !== movie.id)
          );
          setFilteredMovies((state) =>
            state.filter((c) => c.movieId !== movie.id)
          );
        })
        .catch((error) => {
          console.log(error);
          requestStatusPopupAction(errorMessage, false);
        });
    }
  }

  function handleLogout() {
    MainApi.logout()
      .then(() => {
        localStorage.clear();
        setIsSelectedShortMovies(false);
        setMovieName("");
        setFoundMovies([]);
        setIsMoviesResultBlockOpen(false);
        setIsMoviesNotFoundErrorMessageVisible(false);
        setIsSelectedShortSavedMovies(false);
        setSavedMovieName("");
        setFilteredMovies([]);
        setIsSavedMoviesResultBlockOpen(true);
        setIsSavedMoviesNotFoundErrorMessageVisible(false);
        setIsFiltered(false);
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function successAuthorization() {
    setLoggedIn(true);
    history.push("/movies");
  }

  function requestStatusPopupAction(message, isSuccess) {
    setIsRequestPopupSuccess(isSuccess);
    setRequestStatusPopupMessage(message);
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
            requestStatusPopupMessage={requestStatusPopupMessage}
            isRequestPopupSuccess={isRequestPopupSuccess}
            isResultBlockOpen={isMoviesResultBlockOpen}
            isNotFoundErrorMessageVisible={isMoviesNotFoundErrorMessageVisible}
            isErrorMessageVisible={isMoviesErrorMessageVisible}
            onSubmitSearchForm={handleFindMovies}
            isSelectedShortMovies={isSelectedShortMovies}
            movieName={movieName}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            onMovieLike={handleLikeMovie}
            isPreloaderOpen={isPreloaderOpen}
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
            requestStatusPopupMessage={requestStatusPopupMessage}
            isRequestPopupSuccess={isRequestPopupSuccess}
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
            requestStatusPopupMessage={requestStatusPopupMessage}
            isRequestPopupSuccess={isRequestPopupSuccess}
            onLogout={handleLogout}
            onUpdateProfileInfo={updateProfileInfo}
          />
          <Route exact path="/sign-up">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
              isRequestStatusPopupOpen={isRequestStatusPopupOpen}
              requestStatusPopupMessage={requestStatusPopupMessage}
              isRequestPopupSuccess={isRequestPopupSuccess}
              onClose={closeAllWindows}
              onRegistration={registration}
            />
            )}
          </Route>
          <Route exact path="/sign-in">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                isRequestStatusPopupOpen={isRequestStatusPopupOpen}
                requestStatusPopupMessage={requestStatusPopupMessage}
                isRequestPopupSuccess={isRequestPopupSuccess}
                onClose={closeAllWindows}
                onLogin={authorization}
              />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
