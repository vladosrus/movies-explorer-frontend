import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies(props) {
  return (
    <article className="movies-page">
      <SearchForm />
      <MoviesCardList movies={props.movies} />
      <Preloader />
    </article>
  );
}
