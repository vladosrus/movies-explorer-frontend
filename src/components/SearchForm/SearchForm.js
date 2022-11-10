import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <fieldset className="search-form__film-name">
          <div className="search-form__search-icon" />
          <input
            type="text"
            className="search-form__film-name-input"
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__submit-button" />
        </fieldset>
        <fieldset className="search-form__short-film">
          <FilterCheckbox />
        </fieldset>
      </form>
    </section>
  );
}
