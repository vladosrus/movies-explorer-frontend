import "./NavTab.css";

export default function NavTab() {

  function scrollTo(element) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: document.getElementById(element).offsetTop,
    });
  }

  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo("about-project")}
            className="nav-tab__button"
          >
            О проекте
          </button>
        </li>
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo("techs")}
            className="nav-tab__button"
          >
            Технологии
          </button>
        </li>
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo("about-me")}
            className="nav-tab__button"
          >
            Студент
          </button>
        </li>
      </ul>
    </nav>
  );
}
