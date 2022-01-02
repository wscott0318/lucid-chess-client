import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Refund.scss";

export const Refund = ({ show, msg }) => {
  return (
    <Modal
      className="refund"
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="refund-container">
        <div className="refund-container-msg">{msg}</div>
        <div className="refund-container-btn_group">
          <div className="refund-container-btn_group-yes">Refund</div>
          <div className="refund-container-btn_group-no">Keep finding</div>
        </div>
      </div>
    </Modal>
  );
};

export default Refund;
