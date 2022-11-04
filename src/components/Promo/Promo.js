import './Promo.css'
import LargeText from "../LargeText/LargeText";
import NavTab from "../NavTab/NavTab";


export default function Promo() {
  return <section className="promo">
    <div className="promo__container">
      <LargeText isMainHeading={true} className={"promo__title"} text={"Учебный проект студента факультета Веб-разработки."} />
      <NavTab />
    </div>
  </section>;
}
