import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__message">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022.</p>
        <ul className="footer__links-list">
          <li>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
