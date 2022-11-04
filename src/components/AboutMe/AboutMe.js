import "./AboutMe.css";
import studentImg from "../../images/about-me__img.jpg"
import TabTitle from "../TabTitle/TabTitle";
import LargeText from "../LargeText/LargeText";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <TabTitle text={"Студент"} />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <LargeText
            isMainHeading={false}
            className={"about-me__name"}
            text={"Виталий"}
          />
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/vladosrus"
            target="_blank"
            rel="noreferrer"
            className="about-me__github-link"
          >
            Github
          </a>
        </div>
        <img src={studentImg} alt="Фотография студента" className="about-me__img"></img>
      </div>
    </section>
  );
}
