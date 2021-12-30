import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orientation.scss";

export const Orientation = ({ show }) => {
  return (
    <Modal
      className="Orientation"
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="u-container">
        <div className="u-msg">Please convert to landscape mode.</div>
      </div>
    </Modal>
  );
};

export default Orientation;
