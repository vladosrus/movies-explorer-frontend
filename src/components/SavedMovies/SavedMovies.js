import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";

export default function SavedMovies(props) {
  return (
    <>
      <Header
        onNavigationBottomClick={props.onNavBottonClick}
        loggedIn={props.loggedIn}
      />
      <main>
        <article className="saved-movies-page">
          <SearchForm
            onSubmitSearchForm={props.onSubmitSearchForm}
            isSelectedShortMovies={props.isSelectedShortMovies}
            movieName={props.movieName}
            foundMovies={props.foundMovies}
          />
          <SavedMoviesCardList
            savedMovies={props.savedMovies}
            filteredMovies={props.filteredMovies}
            isFiltered={props.isFiltered}
            isResultBlockOpen={props.isResultBlockOpen}
            isNotFoundErrorMessageVisible={props.isNotFoundErrorMessageVisible}
            isErrorMessageVisible={props.isErrorMessageVisible}
            onMovieDelete={props.onMovieDelete}
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
          message={props.requestStatusPopupMessage}
          isSuccess={props.isRequestPopupSuccess}
          onClose={props.onClose}
          onOverlayClick={props.onClose}
        />
      </main>
      <Footer />
    </>
  );
}
