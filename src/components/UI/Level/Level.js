import React, { Component } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Level.scss";
import testImg from "../../../assets/img/level.jpg";

export default class Level extends Component {
  render() {
    return (
      <Modal
        className="Level"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="u-container">
            <div className="u-ribbon">Choose Level</div>
            <div className="u-content">
              <div className="u-content-container">
                <div className="u-table-wrap">
                  <div className="u-row">
                    <div className="u-item-container">
                      <button className="u-item">AI MonKey</button>
                    </div>
                    <div className="u-item-container">
                      <button className="u-item">Beginner</button>
                    </div>
                  </div>
                  <div className="u-row">
                    <div className="u-item-container">
                      <button className="u-item">Intermediate</button>
                    </div>
                    <div className="u-item-container">
                      <button className="u-item">Advanced</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Image
            className="u-background"
            src={testImg}
            style={{ width: "200%", height: "200px" }}
          ></Image> */}
        </Modal.Body>
      </Modal>
    );
  }
}
