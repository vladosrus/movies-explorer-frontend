import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";

let arrayForHoldingMovies = [];
let slicedMovies = [];

export default function MoviesCardList(props) {
  const { width } = useWindowSize();

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [next, setNext] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(4);

  const loopWithSlice = (start, end) => {
    const slice = props.foundMovies.slice(start, end);
    slicedMovies = [...slice];
    arrayForHoldingMovies = [...arrayForHoldingMovies, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies);
  };

  const moviesToShowAmong = () => {
    if (width <= 1200 && width >= 1118) {
      setMoviesPerPage(3);
      setNext(3);
    } else if (width <= 1117 && width >= 691) {
      setMoviesPerPage(2);
      setNext(2);
    } else {
      setMoviesPerPage(5);
      setNext(5);
    }
  };

  useEffect(() => {
    moviesToShowAmong();
    arrayForHoldingMovies = [];
    loopWithSlice(0, moviesPerPage);
  }, [props.foundMovies, width]);

  const handleShowMoreMovies = () => {
    loopWithSlice(next, next + moviesPerPage);
    setNext(next + moviesPerPage);
  };

  const moviesResultBlockClassname = `movies-cards__result-block ${
    props.isResultBlockOpen && "movies-cards__result-block_visible"
  }`;
  const notFoundErrorMessage = `${
    props.isNotFoundErrorMessageVisible
      ? "Ничего не найдено"
      : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  }`;
  const moreMoviesButtonClassname = `movies-cards__more-movies-card-button ${
    props.isResultBlockOpen &&
    props.foundMovies?.length > moviesPerPage &&
    slicedMovies.length === moviesPerPage &&
    "movies-cards__more-movies-card-button_visible"
  }`;

  return (
    <section className="movies-cards ">
      <ul className={moviesResultBlockClassname}>
        {moviesToShow?.map((newMovie) => {
          return (
            <li className="movies-cards__result-block-item" key={newMovie.id}>
              <MoviesCard
                savedMovies={props.savedMovies}
                movies={props.foundMovies}
                movie={newMovie}
                imgLink={`https://api.nomoreparties.co${newMovie.image.formats.thumbnail.url}`}
                trailerLink={newMovie.trailerLink}
                name={newMovie.nameRU}
                duration={newMovie.duration}
                onMovieLike={props.onMovieLike}
                onMovieDelete={props.onMovieDelete}
              />
            </li>
          );
        })}
      </ul>
      {(props.isNotFoundErrorMessageVisible || props.isErrorMessageVisible) && (
        <h2 className={"movies-cards__error-message"}>
          {notFoundErrorMessage}
        </h2>
      )}
      <button
        type="button"
        className={moreMoviesButtonClassname}
        onClick={handleShowMoreMovies}
      >
        Ещё
      </button>
    </section>
  );
}
