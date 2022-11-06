import "./Logo.css";
import logo from "../../images/header__logo.svg";

export default function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="Логотип дипломного проекта" />
    </a>
  );
}
