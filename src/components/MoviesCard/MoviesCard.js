import "./MoviesCard.css";
import { useCallback, useState } from "react";

export default function MoviesCard(props) {
  const [isFavorites, setIsFavorites] = useState(false);
  const onFavouritesButtonClick = useCallback(
    () => setIsFavorites(!isFavorites),
    [isFavorites]
  );
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
        <button
          className={moviesCardFavouritesButtonClassName}
          type="button"
          onClick={onFavouritesButtonClick}
        />
      </div>
    </article>
  );
}
