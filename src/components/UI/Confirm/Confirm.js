import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Confirm.scss";

export const Confirm = ({ show, msg, path, hideAction }) => {
  return (
    <Modal
      className="Confirm"
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="u-container">
        <div className="u-msg">{msg}</div>
        <div className="u-btn-group">
          <div
            className="u-btn-yes"
            onClick={() => {
              window.location.href = path;
            }}
          >
            Yes
          </div>
          <div className="u-btn-no" onClick={hideAction}>
            No
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
