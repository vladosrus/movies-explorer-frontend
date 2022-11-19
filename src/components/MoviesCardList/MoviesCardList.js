import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <section className="movies-cards ">
      <ul className="movies-cards__list">
        {props.movies?.map((newMovie) => {
          return (
            <li className="movies-cards__list-item" key={newMovie.id}>
              <MoviesCard
                imgLink={`https://api.nomoreparties.co${newMovie.image.formats.thumbnail.url}`}
                trailerLink={newMovie.trailerLink}
                name={newMovie.nameRU}
                duration={newMovie.duration}
              />
            </li>
          );
        })}
      </ul>
      <button type="button" className="movies-cards__more-movies-card-button">
        Ещё
      </button>
    </section>
  );
}
