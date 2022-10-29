import "./App.css";
import { Route, Switch } from "react-router-dom";

// Импорты компонентов
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

export default function App() {
  return (
    <div className="page">
      <main>
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
        </Route>
        <Route exact path="/movies">
          <Header />
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <Header />
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route exact path="/sign-up">
          <Register />
        </Route>
        <Route exact path="/sign-in">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      </main>
      <Footer />
    </div>
  );
}
