import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function Movies(props) {
  return (
    <>
      <Header
        onNavigationBottomClick={props.onNavBottonClick}
        loggedIn={props.loggedIn}
      />
      <main>
        <article className="movies-page">
          <SearchForm
            onSubmitSearchForm={props.onSubmitSearchForm}
            isSelectedShortMovies={props.isSelectedShortMovies}
            movieName={props.movieName}
            foundMovies={props.foundMovies}
          />
          <MoviesCardList
            savedMovies={props.savedMovies}
            foundMovies={props.foundMovies}
            isResultBlockOpen={props.isResultBlockOpen}
            isNotFoundErrorMessageVisible={props.isNotFoundErrorMessageVisible}
            isErrorMessageVisible={props.isErrorMessageVisible}
            onMovieLike={props.onMovieLike}
            isPreloaderOpen={props.isPreloaderOpen}
          />
          <Preloader />
        </article>
        <Navigation
          isOpen={props.isNavigationMenuOpen}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
        />
      </main>
      <Footer />
    </>
  );
}
