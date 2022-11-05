import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies(props) {
  return (
    <article className="saved-movies-page">
      <SearchForm />
      <MoviesCardList movies={props.movies} />
      <Preloader />
    </article>
  );
}
