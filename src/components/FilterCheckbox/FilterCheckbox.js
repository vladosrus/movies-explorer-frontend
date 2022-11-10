import "./FilterCheckbox.css";
import { useCallback, useState } from "react";

export default function FilterCheckbox() {
  const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(false);
  const onSelectShortMovie = useCallback(
    () => setIsSelectedIsShortMovie(!isSelectedShortMovie),
    [isSelectedShortMovie]
  );

  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox__default" />
      <span className="checkbox__new-box" onClick={onSelectShortMovie}>
        <span
          className={`checkbox__new-indicator ${
            isSelectedShortMovie ? "checkbox__new-indicator_selected" : ""
          }`}
        ></span>
      </span>
      Короткометражки
    </label>
  );
}
