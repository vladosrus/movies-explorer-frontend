import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";
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
            isNotFoundErrorMessageVisible={
              props.isNotFoundErrorMessageVisible
            }
            isErrorMessageVisible={props.isErrorMessageVisible}
            onMovieLike={props.onMovieLike}
          />
          <Preloader />
        </article>
        <Navigation
          isOpen={props.isNavigationMenuOpen}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
        />
        <RequestStatusPopup
          isOpen={props.isRequestStatusPopupOpen}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
          code={200}
          message={"Фильм удалён"}
        />
      </main>
      <Footer />
    </>
  );
}
