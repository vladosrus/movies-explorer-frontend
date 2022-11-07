import "./ProfileButton.css";
import { Link } from "react-router-dom";
import profileIcon from "../../images/profile-button__profile-icon.svg";

export default function ProfileButton() {
  return (
    <Link
      to={"/profile"}
      className="profile-button"
    >
      <img
        src={profileIcon}
        alt="Иконка профиля"
        className="profile-button__profile-icon"
      ></img>
      Аккаунт
    </Link>
  );
}
