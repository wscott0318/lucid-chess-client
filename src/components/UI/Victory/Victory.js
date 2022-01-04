import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Victory.scss";
import backImg from "../../../assets/img/back_bg.png";
import markImg from "../../../assets/img/victory_mark.png";
import item1Img from "../../../assets/img/victory_item1.png";
import item2Img from "../../../assets/img/victory_item2.png";
import { useEffect, useState } from "react";
import Ranking from "../Ranking/Ranking";

export const Victory = ({ show, roomName, onClickLLGSymbol, tax }) => {
  const [loading, setLoading] = useState(false);
  const [llgToGetPaid, setLLGToGetPaid] = useState(0);
  const [llgDeposited, setLLGDeposited] = useState(0);
  const [ranking, setRanking] = useState(false);

  useEffect(() => {
    calcLLGs();
  });

  const onClick = () => {
    if (roomName == "Classic Room") window.location.href = "/";
    else {
      onClickLLGSymbol();
      setLoading(true);
    }
  };

  const calcLLGs = () => {
    switch (roomName) {
      case "Silver Room":
        setLLGToGetPaid(100);
        setLLGDeposited((100 * (100 - tax)) / 100);
        break;
      case "Gold Room":
        setLLGToGetPaid(200);
        setLLGDeposited((200 * (100 - tax)) / 100);
        break;
      case "Platinum Room":
        setLLGToGetPaid(400);
        setLLGDeposited((400 * (100 - tax)) / 100);
        break;
      case "Diamond Room":
        setLLGToGetPaid(1000);
        setLLGDeposited((1000 * (100 - tax)) / 100);
        break;
    }
  };

  return (
    <Modal
      className="Victory"
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="u-container">
          <Image className="u-background" src={backImg}></Image>
          <div className="u-foreground">
            <Image className="u-mark" src={markImg}></Image>
            <div className="u-list">
              <div className="u-list-item">
                <Image className="u-item-image" src={item1Img}></Image>
                <div className="u-item-text">{llgToGetPaid}</div>
              </div>
              <div className="u-list-item">
                <Image className="u-item-image" src={item2Img}></Image>
                <div className="u-item-text">{llgDeposited}</div>
              </div>
            </div>
            <div className="u-btn-group">
              <button className="u-button" disabled={loading} onClick={onClick}>
                {loading ? "Loading..." : "Return Home"}
              </button>
              <button
                className="u-button"
                disabled={loading}
                onClick={() => setRanking(true)}
              >
                Ranking
              </button>
            </div>
          </div>
        </div>
        <Ranking show={ranking} hideAction={() => setRanking(false)}></Ranking>
      </Modal.Body>
    </Modal>
  );
};

export default Victory;
