import "./MoviesCard.css";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

export default function MoviesCard(props) {
  const [isFavorites, setIsFavorites] = useState();
  const onFavouritesButtonClick = useCallback(() => {
    const { onMovieLike, movie } = props;
    setIsFavorites(!isFavorites);
    onMovieLike(movie, isFavorites);
  }, [isFavorites, props]);

  useEffect(() => {
    setIsFavorites(
      props.savedMovies?.some(
        (savedMovie) => savedMovie.movieId === props.movie.id
      )
    );
  }, [props.savedMovies, props.movie]);

  function onDeleteButtonClick() {
    props.onMovieDelete(props.movie._id);
  }

  const moviesCardFavouritesButtonClassName = `movies-card__favourites-button ${
    isFavorites && "movies-card__favourites-button_active"
  }`;

  const convertMinutes = (min) => {
    let hours = Math.floor(min / 60);
    let minutes = min % 60;
    return `${hours}ч${minutes}м`;
  };

  return (
    <article className="movies-card">
      <a
        href={props.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__trailer-link"
      >
        <img
          className="movies-card__image"
          src={props.imgLink}
          alt={props.name}
        />
      </a>

      <div className="movies-card__caption">
        <div className="movies-card__caption-container">
          <h2 className="movies-card__title">{props.name}</h2>
          <p className="movies-card__duration">
            {convertMinutes(props.duration)}
          </p>
        </div>
        <Switch>
          <Route exact path="/movies">
            <button
              className={moviesCardFavouritesButtonClassName}
              type="button"
              onClick={onFavouritesButtonClick}
            />
          </Route>
          <Route exact path="/saved-movies">
            <button
              className="movies-card__delete-button"
              type="button"
              onClick={onDeleteButtonClick}
            />
          </Route>
        </Switch>
      </div>
    </article>
  );
}
