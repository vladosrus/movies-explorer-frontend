import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <article className="main-page">
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </article>
      </main>
      <Footer />
    </>
  );
}
