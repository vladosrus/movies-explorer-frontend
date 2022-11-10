import "./NavTab.css";

export default function NavTab() {
  const aboutProject = document.querySelector("#about-project");
  const techs = document.querySelector("#techs");
  const aboutMe = document.querySelector("#about-me");

  function scrollTo(element) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: element.offsetTop,
    });
  }

  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo(aboutProject)}
            className="nav-tab__button"
          >
            О проекте
          </button>
        </li>
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo(techs)}
            className="nav-tab__button"
          >
            Технологии
          </button>
        </li>
        <li className="nav-tab__list-item">
          <button
            type="button"
            onClick={() => scrollTo(aboutMe)}
            className="nav-tab__button"
          >
            Студент
          </button>
        </li>
      </ul>
    </nav>
  );
}
