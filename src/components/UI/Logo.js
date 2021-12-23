import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logoPng from "../../assets/img/logo.png";
import "./ui_common.css";

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
        <img src={logoPng}></img>
      </Modal>
    );
  }
}
