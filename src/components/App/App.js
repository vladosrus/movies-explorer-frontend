import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import {
  errorMessage,
  successUpdateUserInfoMessage,
} from "../../utils/constants";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const handleLogout = useCallback(() => {
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
        return <Navigate to="/diploma/" />;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localStorageCheck();
    if (!loggedIn) {
      Promise.all([MainApi.getProfileInfo(), MainApi.getSavedMovies()])
        .then(([currentUserInfo, savedMovies]) => {
          setCurrentUser(currentUserInfo);
          setSavedMovies(savedMovies);
          setLoggedIn(true);
        })
        .catch(({ promise, status }) => {
          if (status === 401) {
            handleLogout();
          } else {
            promise.then((err) => {
              err.message
                ? console.log(`Ошибка ${status}: ${err.message}`)
                : console.log(`Ошибка ${status}`);
            });
          }
        });
    }
  }, [loggedIn, localStorageCheck, handleLogout]);

  function registration(name, email, password, setIsFormDisabled) {
    setIsFormDisabled(true);
    MainApi.registration(name, email, password)
      .then(() => {
        authorization(email, password, setIsFormDisabled);
      })
      .catch(({ promise, status }) => {
        promise
          .then((err) => {
            err.message
              ? console.log(`Ошибка ${status}: ${err.message}`)
              : console.log(`Ошибка ${status}`);
            err.statusCode === 400
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
        setLoggedIn(true);
        successAuthorization();
      })
      .catch(({ promise, status }) => {
        promise
          .then((err) => {
            err.message
              ? console.log(`Ошибка ${status}: ${err.message}`)
              : console.log(`Ошибка ${status}`);
            err.statusCode === 400
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
        requestStatusPopupAction(successUpdateUserInfoMessage, true);
      })
      .catch(({ promise, status }) => {
        if (status === 401) {
          handleLogout();
        } else {
          promise
            .then((err) => {
              err.message
                ? console.log(`Ошибка ${status}: ${err.message}`)
                : console.log(`Ошибка ${status}`);
              err.statusCode === 400
                ? requestStatusPopupAction(err.validation.body.message, false)
                : requestStatusPopupAction(err.message, false);
            })
            .catch((err) => console.log(err));
        }
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

    if (!localStorage.beatfilmMovies) {
      setIsPreloaderOpen(true);
      MoviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem("beatfilmMovies", JSON.stringify(movies));
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
        JSON.parse(localStorage.beatfilmMovies),
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
      .catch(({ promise, status }) => {
        if (status === 401) {
          handleLogout();
        } else {
          promise
            .then((err) => {
              err.message
                ? console.log(`Ошибка ${status}: ${err.message}`)
                : console.log(`Ошибка ${status}`);
              requestStatusPopupAction(errorMessage, false);
            })
            .catch((err) => console.log(err));
        }
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
        .catch(({ promise, status }) => {
          if (status === 401) {
            handleLogout();
          } else {
            promise
              .then((err) => {
                err.message
                  ? console.log(`Ошибка ${status}: ${err.message}`)
                  : console.log(`Ошибка ${status}`);
                requestStatusPopupAction(errorMessage, false);
              })
              .catch((err) => console.log(err));
          }
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
        .catch(({ promise, status }) => {
          if (status === 401) {
            handleLogout();
          } else {
            promise
              .then((err) => {
                err.message
                  ? console.log(`Ошибка ${status}: ${err.message}`)
                  : console.log(`Ошибка ${status}`);
                requestStatusPopupAction(errorMessage, false);
              })
              .catch((err) => console.log(err));
          }
        });
    }
  }

  function successAuthorization() {
    setLoggedIn(true);
    navigate("/diploma/movies");
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
        <Routes>
          <Route
            path="/diploma/"
            element={
              <Main
                loggedIn={loggedIn}
                onNavigationBottomClick={handleNavigationBottomClick}
                onClose={closeAllWindows}
                isNavigationMenuOpen={isNavigationMenuOpen}
              />
            }
          />
          <Route path="/diploma/*">
            <Route
              path="movies"
              element={
                <ProtectedRoute redirectTo="/diploma/" loggedIn={loggedIn}>
                  <Movies
                    loggedIn={loggedIn}
                    onNavBottonClick={handleNavigationBottomClick}
                    onClose={closeAllWindows}
                    isNavigationMenuOpen={isNavigationMenuOpen}
                    isRequestStatusPopupOpen={isRequestStatusPopupOpen}
                    requestStatusPopupMessage={requestStatusPopupMessage}
                    isRequestPopupSuccess={isRequestPopupSuccess}
                    isResultBlockOpen={isMoviesResultBlockOpen}
                    isNotFoundErrorMessageVisible={
                      isMoviesNotFoundErrorMessageVisible
                    }
                    isErrorMessageVisible={isMoviesErrorMessageVisible}
                    onSubmitSearchForm={handleFindMovies}
                    isSelectedShortMovies={isSelectedShortMovies}
                    movieName={movieName}
                    savedMovies={savedMovies}
                    foundMovies={foundMovies}
                    onMovieLike={handleLikeMovie}
                    isPreloaderOpen={isPreloaderOpen}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRoute redirectTo="/diploma/" loggedIn={loggedIn}>
                  <SavedMovies
                    loggedIn={loggedIn}
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
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute redirectTo="/diploma/" loggedIn={loggedIn}>
                  <Profile
                    loggedIn={loggedIn}
                    onNavBottonClick={handleNavigationBottomClick}
                    onClose={closeAllWindows}
                    isNavigationMenuOpen={isNavigationMenuOpen}
                    isRequestStatusPopupOpen={isRequestStatusPopupOpen}
                    requestStatusPopupMessage={requestStatusPopupMessage}
                    isRequestPopupSuccess={isRequestPopupSuccess}
                    onLogout={handleLogout}
                    onUpdateProfileInfo={updateProfileInfo}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="sign-up"
              element={
                loggedIn ? (
                  <Navigate to="/diploma/" />
                ) : (
                  <Register
                    isRequestStatusPopupOpen={isRequestStatusPopupOpen}
                    requestStatusPopupMessage={requestStatusPopupMessage}
                    isRequestPopupSuccess={isRequestPopupSuccess}
                    onClose={closeAllWindows}
                    onRegistration={registration}
                  />
                )
              }
            />
            <Route
              path="sign-in"
              element={
                loggedIn ? (
                  <Navigate to="/diploma/" />
                ) : (
                  <Login
                    isRequestStatusPopupOpen={isRequestStatusPopupOpen}
                    requestStatusPopupMessage={requestStatusPopupMessage}
                    isRequestPopupSuccess={isRequestPopupSuccess}
                    onClose={closeAllWindows}
                    onLogin={authorization}
                  />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
