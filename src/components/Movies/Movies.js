import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  return (<article className="movies-page">
    <SearchForm />
    <MoviesCardList />
    <Preloader />
  </article>);
}
