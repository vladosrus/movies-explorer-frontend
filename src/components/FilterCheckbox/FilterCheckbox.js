import "./FilterCheckbox.css";

export default function FilterCheckbox(props) {
  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox__default" />
      <span className="checkbox__new-box" onClick={props.onSelectShortMovie}>
        <span
          className={`checkbox__new-indicator ${
            props.isSelectedShortMovie ? "" : "checkbox__new-indicator_selected"
          }`}
        ></span>
      </span>
      Короткометражки
    </label>
  );
}
