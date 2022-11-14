import EntrancePage from "../EntrancePage/EntrancePage";
import RequestStatusPopup from "../RequestStatusPopup/RequestStatusPopup";

export default function Register(props) {
  return (
    <main>
      <EntrancePage name={"register"} />
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
