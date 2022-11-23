import EntrancePage from "../EntrancePage/EntrancePage";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";

export default function Login(props) {
  return (
    <main>
      <EntrancePage name={"login"} onLogin={props.onLogin} />
      <RequestStatusPopup
        place={'login'}
        isOpen={props.isRequestStatusPopupOpen}
        message={props.requestStatusPopupMessage}
        isSuccess={props.isRequestPopupSuccess}
        onClose={props.onClose}
        onOverlayClick={props.onClose}
      />
    </main>
  );
}
