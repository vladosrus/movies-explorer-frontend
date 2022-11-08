import "./Techs.css";
import TabTitle from "../TabTitle/TabTitle";

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <TabTitle text={"Технологии"} />
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__technologies-list">
          <li className="techs__technologies-item">HTML</li>
          <li className="techs__technologies-item">CSS</li>
          <li className="techs__technologies-item">JS</li>
          <li className="techs__technologies-item">React</li>
          <li className="techs__technologies-item">Git</li>
          <li className="techs__technologies-item">Express.js</li>
          <li className="techs__technologies-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
