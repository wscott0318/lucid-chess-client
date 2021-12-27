import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JoinGame.scss";

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
                ></input>
              </div>
              <div className="u-input-wrap">
                <input
                  className="u-input"
                  type="text"
                  placeholder="Secret key"
                ></input>
              </div>
              <button className="u-button">Join</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
