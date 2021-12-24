import React, { Component } from "react";
import { Modal, Image, Button } from "react-bootstrap";
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
              <button className="u-button">Return Home</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
