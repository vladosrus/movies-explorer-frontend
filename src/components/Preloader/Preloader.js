import "./Preloader.css";

export default function Preloader(props) {
  return (
    <section className={`preloader ${props.isOpen && "preloader_visible"}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </section>
  );
}
