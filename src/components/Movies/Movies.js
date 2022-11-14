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
      <Header onNavigationBottomClick={props.onNavBottonClick} />
      <main>
        <article className="movies-page">
          <SearchForm />
          <MoviesCardList movies={props.movies} />
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
