import React, { Component } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
import mode2Img from "../../../assets/img/select_game_friend.png";
import mode3Img from "../../../assets/img/select_game_computer.png";

export default class GameSelect extends Component {
  render() {
    return (
      <Modal
        className="GameSelect"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="u-container">
            <div className="u-ribbon">Select Game</div>
            <div className="u-content">
              <div className="u-item">
                <Image className="u-item-image" src={mode1Img}></Image>
                <div className="u-item-text">Match with Random User</div>
              </div>
              <div className="u-item">
                <Image className="u-item-image" src={mode2Img}></Image>
                <div className="u-item-text">Match with Friend</div>
              </div>
              <div className="u-item">
                <Image className="u-item-image" src={mode3Img}></Image>
                <div className="u-item-text">Match with Computer</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
