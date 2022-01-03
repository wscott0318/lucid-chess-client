import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Claim.scss";

export const Claim = ({ show, msg, onClickClaim, btnText }) => {
  return (
    <Modal
      className="Claim"
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <div className="u-container">
          <div className="u-ribbon">Play to earn</div>
          <div className="u-content">
            <div className="u-content-container">
              <div className="u-text">{msg}</div>
              <div className="u-button" onClick={onClickClaim}>{btnText}</div>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default Claim;
