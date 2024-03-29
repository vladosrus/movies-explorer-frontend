import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useForm } from "../../hooks/useForm";
import { useState, useCallback, useEffect } from "react";

export default function SearchForm(props) {
  const { values, handleChange, setValues } = useForm();
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    setValues({ filmName: props.movieName });
    setIsSelectedIsShortMovie(props.isSelectedShortMovies);
  }, [setValues, props.movieName, props.isSelectedShortMovies]);

  // Управление состояниями чекбокса
  const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(false);
  const onSelectShortMovie = useCallback(() => {
    setIsSelectedIsShortMovie(!isSelectedShortMovie);
    props.onSubmitSearchForm(
      !isSelectedShortMovie,
      values.filmName,
      setIsFormDisabled
    );
  }, [isSelectedShortMovie, props, values.filmName]);

  function handleSubmit(evt) {
    evt.preventDefault();

    values.filmName
      ? props.onSubmitSearchForm(
          isSelectedShortMovie,
          values.filmName,
          setIsFormDisabled
        )
      : setIsErrorMessageVisible(true);
  }

  const handleChangeInputValue = useCallback(
    (evt) => {
      if (evt.target.value !== "") {
        setIsErrorMessageVisible(false);
      }
      handleChange(evt);
    },
    [handleChange]
  );

  function handleChangeFocus() {
    setIsInputFocus(!isInputFocus);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <fieldset
          className={`search-form__film-name ${
            isInputFocus && "search-form__film-name_focus"
          }`}
        >
          <div className="search-form__search-icon" />
          <div className="search-form__input-container">
            <input
              name="filmName"
              type="text"
              className="search-form__film-name-input"
              placeholder="Фильм"
              required
              value={values.filmName || ""}
              onChange={handleChangeInputValue}
              onClick={() => setIsErrorMessageVisible(false)}
              onFocus={handleChangeFocus}
              onBlur={handleChangeFocus}
              disabled={isFormDisabled}
            />
            <span
              className={`search-form__error-message ${
                isErrorMessageVisible && "search-form__error-message_visible"
              }`}
            >
              Нужно ввести ключевое слово
            </span>
          </div>

          <button
            type="submit"
            className="search-form__submit-button"
            disabled={isFormDisabled}
          />
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
