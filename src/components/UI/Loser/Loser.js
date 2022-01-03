import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loser.scss";
import Ranking from "../Ranking/Ranking";
import { useState } from "react";

export const Loser = ({ show, msg }) => {
  const [ranking, setRanking] = useState(false);

  return (
    <Modal
      className="Loser"
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
              window.location.href = "/";
            }}
          >
            Return Home
          </div>
          <div className="u-btn-no" onClick={() => setRanking(true)}>Ranking</div>
        </div>
      </div>
      <Ranking show={ranking} hideAction={() => setRanking(false)}></Ranking>
    </Modal>
  );
};

export default Loser;
