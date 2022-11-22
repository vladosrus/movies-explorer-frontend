import "./SavedMoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";


export default function SavedMoviesCardList(props) {
  const moviesResultBlockClassname = `movies-cards__result-block ${
    props.isResultBlockOpen && "movies-cards__result-block_visible"
  }`;
  const notFoundErrorMessage = `${
    props.isNotFoundErrorMessageVisible
      ? "Ничего не найдено"
      : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
  }`;
  
  return (
    <section className="movies-cards ">
      <ul className={moviesResultBlockClassname}>
        {props.isFiltered
          ? props.filteredMovies?.map((newMovie) => {
              return (
                <li
                  className="movies-cards__result-block-item"
                  key={newMovie._id}
                >
                  <MoviesCard
                    movies={props.filteredMovies}
                    movie={newMovie}
                    imgLink={newMovie.thumbnail}
                    trailerLink={newMovie.trailerLink}
                    name={newMovie.nameRU}
                    duration={newMovie.duration}
                    onMovieLike={props.onMovieLike}
                    onMovieDelete={props.onMovieDelete}
                  />
                </li>
              );
            })
          : props.savedMovies?.map((newMovie) => {
              return (
                <li
                  className="movies-cards__result-block-item"
                  key={newMovie._id}
                >
                  <MoviesCard
                    movies={props.savedMovies}
                    movie={newMovie}
                    imgLink={newMovie.thumbnail}
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
    </section>
  );
}
