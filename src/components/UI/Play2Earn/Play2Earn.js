import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Play2Earn.scss";
// import joinGameImg from "../../assets/img/join_game.png";

export default class Play2Earn extends Component {
  render() {
    console.log("test")
    return (
      <Modal
        className="Play2Earn"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Body> */}
          <div className="u-container">
            <div className="u-ribbon">Play2Earn</div>
            <div className="u-content">
              {/* <div className="u-description">
                Name must have minimum 2 and maximum 20 characters
              </div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Enter your name"
                ></input>
              </div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Secret key"
                ></input>
              </div> */}
              <div className="u-logo"></div>

              <div className="u-buttongroup">
                <button className="u-button">Create Game</button>
                <button className="u-button">Join Game</button>
              </div>
            </div>
          </div>
          {/* <Image
            className="u-item-image"
            src={joinGameImg}
            width={500}
            height={500}
          ></Image> */}
        {/* </Modal.Body> */}
      </Modal>
    );
  }
}
