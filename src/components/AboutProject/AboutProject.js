import "./AboutProject.css";
import TabTitle from "../TabTitle/TabTitle";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <TabTitle text={"О проекте"} />
      <ul className="about-project__stages-grid-container">
        <li className="about-project__stages-grid-container-list-item">
          <h3 className="about-project__stage-title">
            Дипломный проект включал 5 этапов
          </h3>
        </li>
        <li className="about-project__stages-grid-container-list-item">
          <p className="about-project__stage-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__stages-grid-container-list-item">
          <h3 className="about-project__stage-title">
            На выполнение диплома ушло 5 недель
          </h3>
        </li>
        <li className="about-project__stages-grid-container-list-item">
          <p className="about-project__stage-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__stages-map-grid-container">
        <li className="about-project__stages-map-grid-container-list-item">
          1 неделя
        </li>
        <li className="about-project__stages-map-grid-container-list-item">
          4 недели
        </li>
        <li className="about-project__stages-map-grid-container-list-item">
          Back-end
        </li>
        <li className="about-project__stages-map-grid-container-list-item">
          Front-end
        </li>
      </ul>
    </section>
  );
}
