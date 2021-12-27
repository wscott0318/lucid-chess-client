import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JoinGame.scss";
import joinGameImg from "../../../assets/img/join_game.png";

export default class JoinGame extends Component {
  render() {
    return (
      <Modal
        className="JoinGame"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="u-container">
            <div className="u-ribbon">Join game</div>
            <div className="u-content">
              <div className="u-description">
                Name must have minimum 2 and maximum 20 characters
              </div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Enter your name"
                  placeholderTextColor="#84617B"
                ></input>
              </div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Secret key"
                  placeholderTextColor="#84617B"
                ></input>
              </div>
              <button className="u-button">Join</button>
            </div>
          </div>
          {/* <Image
            className="u-item-image"
            src={joinGameImg}
            width={500}
            height={500}
          ></Image> */}
        </Modal.Body>
      </Modal>
    );
  }
}
