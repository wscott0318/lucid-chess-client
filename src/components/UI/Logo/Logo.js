import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logoPng from "../../../assets/img/logo.png";
import "./Logo.scss";

export default class Logo extends Component {
  render() {
    return (
      <Modal
        className="Logo"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <img src={logoPng} alt=""></img>
        </Modal.Body>
      </Modal>
    );
  }
}
