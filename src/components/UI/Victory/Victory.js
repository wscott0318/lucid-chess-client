import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Victory.scss";

export default class Victory extends Component {
  render() {
    return (
      <Modal
        className="Popup"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          
      </Modal>
    );
  }
}
