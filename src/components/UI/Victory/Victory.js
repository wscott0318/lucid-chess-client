import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Victory.scss";
import backImg from "../../../assets/img/back_bg.png";
import markImg from "../../../assets/img/victory_mark.png";
import item1Img from "../../../assets/img/victory_item1.png";
import item2Img from "../../../assets/img/victory_item2.png";

export default class Victory extends Component {
  render() {
    return (
      <Modal
        className="Victory"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="u-container">
            <img className="u-background" src={backImg} alt=" "></img>
            <div className="u-content">
              <img className="u-mark" src={markImg} alt=" "></img>
              <div className="u-list">
                <div className="u-item">
                  <img src={item1Img} alt=" "></img>2446
                </div>
                <div className="u-item">
                  <img src={item2Img} alt=" "></img>7
                </div>
              </div>
              <button className="u-button">Return Home</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
