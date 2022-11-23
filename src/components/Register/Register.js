import EntrancePage from "../EntrancePage/EntrancePage";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";

export default function Register(props) {
  return (
    <main>
      <EntrancePage name={"register"} onRegistration={props.onRegistration} />
      <RequestStatusPopup
        place={"register"}
        isOpen={props.isRequestStatusPopupOpen}
        message={props.requestStatusPopupMessage}
        isSuccess={props.isRequestPopupSuccess}
        onClose={props.onClose}
        onOverlayClick={props.onClose}
      />
    </main>
  );
}
