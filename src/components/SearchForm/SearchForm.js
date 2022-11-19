import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useForm } from "../../hooks/useForm";
import { useState, useCallback, useEffect } from "react";

export default function SearchForm(props) {
  const { values, handleChange, setValues } = useForm();
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false)

  useEffect(() => {
    setValues({ filmName: props.searchFormInputValue });
  }, [setValues, props.searchFormInputValue]);

  // Управление состояниями чекбокса
  const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(
    props.checkboxStatus
  );
  const onSelectShortMovie = useCallback(
    () => setIsSelectedIsShortMovie(!isSelectedShortMovie),
    [isSelectedShortMovie]
  );

  function handleSubmit(evt) {
    evt.preventDefault();

    values.filmName
      ? props.onSubmitSearchForm(isSelectedShortMovie, values.filmName)
      : setIsErrorMessageVisible(true);
  }

  function handleChangeFocus() {
    setIsInputFocus(!isInputFocus);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <fieldset className={`search-form__film-name ${isInputFocus && "search-form__film-name_focus"}`}>
          <div className="search-form__search-icon" />
          <div className="search-form__input-container">
            <input
              name="filmName"
              type="text"
              className="search-form__film-name-input"
              placeholder="Фильм"
              required
              value={values.filmName || ""}
              onChange={handleChange}
              onClick={() => setIsErrorMessageVisible(false)}
              onFocus={handleChangeFocus}
              onBlur={handleChangeFocus}
            />
            <span
              className={`search-form__error-message ${
                isErrorMessageVisible && "search-form__error-message_visible"
              }`}
            >
              Нужно ввести ключевое слово
            </span>
          </div>

          <button type="submit" className="search-form__submit-button" />
        </fieldset>

        <fieldset className="search-form__short-film">
          <FilterCheckbox
            isSelectedShortMovie={isSelectedShortMovie}
            onSelectShortMovie={onSelectShortMovie}
          />
        </fieldset>
      </form>
    </section>
  );
}
