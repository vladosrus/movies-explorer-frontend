import "./ProfileButton.css";
import { Link } from "react-router-dom";
import profileIcon from "../../images/profile-button__profile-icon.svg";

export default function ProfileButton(props) {
  return props.onClose ? (
    <Link
      to={"/diploma/profile"}
      className={`profile-button ${props.marginBottomClass}`}
      onClick={props.onClose}
    >
      <img
        src={profileIcon}
        alt="Иконка профиля"
        className="profile-button__profile-icon"
      ></img>
      Аккаунт
    </Link>
  ) : (
    <Link
      to={"/diploma/profile"}
      className={`profile-button ${props.marginBottomClass}`}
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
