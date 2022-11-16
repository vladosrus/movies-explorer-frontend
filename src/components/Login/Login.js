import EntrancePage from "../EntrancePage/EntrancePage";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";

export default function Login(props) {
  return (
    <main>
      <EntrancePage name={"login"} onLogin={props.onLogin} />
      <RequestStatusPopup
        isOpen={props.isRequestStatusPopupOpen}
        onClose={props.onClose}
        onOverlayClick={props.onClose}
        code={200}
        message={"Фильм удалён"}
      />
    </main>
  );
}
