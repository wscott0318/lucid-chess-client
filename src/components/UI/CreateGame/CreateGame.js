import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateGame.scss";
// import joinGameImg from "../../assets/img/join_game.png";

export default class CreateGame extends Component {
  render() {
    console.log("test")
    return (
      <Modal
        className="CreateGame"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Body> */}
          <div className="u-container">
            <div className="u-ribbon">Create game</div>
            <div className="u-content">
              <div className="u-logo"></div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Enter your name"
                ></input>
              </div>
              <div className="u-buttongroup">
                <button className="u-button">Create</button>
              </div>
            </div>
          </div>
      </Modal>
    );
  }
}
