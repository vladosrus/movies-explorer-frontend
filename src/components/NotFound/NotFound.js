import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <article className="not-found-page">
        <h1 className="not-found-page__error-code">404</h1>
        <p className="not-found-page__message">Страница не найдена</p>
        <button
          type="button"
          className="not-found-page__go-back-button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </article>
    </main>
  );
}
