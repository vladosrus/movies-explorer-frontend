import "./Portfolio.css";
import arrow from "../../images/portfolio__arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__tab-title">Портфолио</h2>
      <ul className="portfolio__links-list">
        <li className="portfolio__links-list-item">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Статичный сайт
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__links-list-item">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Адаптивный сайт
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__links-list-item">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Одностраничное приложение
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}
