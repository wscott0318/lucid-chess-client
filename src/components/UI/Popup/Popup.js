import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ui_common.css";
import "./Popup.scss";

export default class Popup extends Component {
  render() {
    return (
      <Modal
        className="Popup"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="form">
          <div className="content">
            and need a popup window (in general) to show information, example :
            confirm if user quit the game, deposit money...
          </div>
          <div className="footer">
            <div className="button-div">Quit</div>
            <div className="button-div">Deposit</div>
          </div>
        </div>
      </Modal>
    );
  }
}
