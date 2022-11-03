import "./TabTitle.css";

export default function TabTitle(props) {
  return (
    <div className="tab-title">
      <h2 className="tab-title__text">{props.text}</h2>
    </div>
  );
}
