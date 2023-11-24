import "./Techs.css";
import TabTitle from "../TabTitle/TabTitle";

const technologies = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Node.js",
  "Express.js",
  "mongoDB",
];

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <TabTitle text={"Технологии"} />
        <h2 className="techs__title">8 технологий</h2>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__technologies-list">
          {technologies.map((technologie) => (
            <li className="techs__technologies-item">{technologie}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
