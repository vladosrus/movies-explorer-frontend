import "./AboutMe.css";
import studentImg from "../../images/about-me__img.jpg";
import TabTitle from "../TabTitle/TabTitle";

export default function AboutMe() {
  const yearsOld = new Date().getFullYear() - 2000;
  const returnNumberInArray = (num) =>
    num > 19 ? returnNumberInArray(num - 10) : num > 9 ? num - 10 : num;
  const years = [
    "лет",
    "год",
    "года",
    "года",
    "года",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
    "лет",
  ];

  return (
    <section className="about-me" id="about-me">
      <TabTitle text={"Студент"} />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h2 className="about-me__name">Владислав</h2>
          <p className="about-me__profession">
            Фронтенд-разработчик, {yearsOld}{" "}
            {years[returnNumberInArray(yearsOld)]}
          </p>
          <p className="about-me__description">
            Я родился и живу в Санкт-Петербурге. Я большой любитель спорта,
            путешествий и активного отдыха. В ноябре 2022 окончил курсы от
            Яндекс.Практикума и получил диплом Веб-разработчика. Сейчас нахожусь
            в активном поиске работы в сфере IT.
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
        <img
          src={studentImg}
          alt="Фотография студента"
          className="about-me__img"
        ></img>
      </div>
    </section>
  );
}
