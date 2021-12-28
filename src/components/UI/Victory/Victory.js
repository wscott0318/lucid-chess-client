import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Victory.scss";
import backImg from "../../../assets/img/back_bg.png";
import markImg from "../../../assets/img/victory_mark.png";
import item1Img from "../../../assets/img/victory_item1.png";
import item2Img from "../../../assets/img/victory_item2.png";
import { useNavigate } from "react-router-dom";

export const Victory = ({ show }) => {
	const navigate = useNavigate();

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
                  <div className="u-item-text">2446</div>
                </div>
                <div className="u-list-item">
                  <Image className="u-item-image" src={item2Img}></Image>
                  <div className="u-item-text">7</div>
                </div>
              </div>
              <button className="u-button" onClick={ () => navigate('/') }>Return Home</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
}

export default Victory;