import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import useMoreMoviesButton from "../../hooks/useMoreMoviesButton";

export default function MoviesCardList(props) {
  const { handleShowMoreMovies, slicedMovies, moviesToShow, moviesPerPage } =
    useMoreMoviesButton(props.foundMovies);

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
      <Preloader isOpen={props.isPreloaderOpen} />
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
