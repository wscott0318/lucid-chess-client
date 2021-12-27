import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InviteFriend.scss";
// import joinGameImg from "../../assets/img/join_game.png";

export default class InviteFriend extends Component {
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
            <div className="u-ribbon">Invite Your friend</div>
            <div className="u-content">
              <div className="u-input-wrap">
                  <input
                    className="u-input"
                    type="text"
                    placeholder="Secret key"
                  ></input>
                  <button className="u-copy-button"></button>
              </div>
                <div className="u-description">
                  Share the secrect key above, so  your friend can join this game !
                </div>
                <button className="u-button">Got it</button>
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
