import "./RequestStatusPopup.css";

export default function RequestStatusPopup(props) {
  // Закрытие меню на esc
  if (props.isOpen) {
    document.addEventListener(
      "keydown",
      (evt) => {
        if (evt.key === "Escape") {
          props.onClose();
        }
      },
      { once: true }
    );
  }

  return (
    <div
      className={`request-status-popup ${
        props.isOpen ? "request-status-popup_opened" : ""
      }`}
    >
      <div
        className="request-status-popup__overlay"
        onClick={props.onOverlayClick}
      ></div>
      <div className="request-status-popup__container">
        <button
          className="request-status-popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <div
          className={`${
            props.isSuccess
              ? "request-status-popup__success-icon"
              : "request-status-popup__unsuccess-icon"
          }`}
        />
        <p className="request-status-popup__message">
          {props.message}
        </p>
      </div>
    </div>
  );
}
