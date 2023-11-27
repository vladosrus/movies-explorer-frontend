import "./Logo.css";
import logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="Логотип дипломного проекта" />
    </Link>
  );
}
