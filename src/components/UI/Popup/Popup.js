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
        <div className="u-container">
          <div className="u-content">
            In the example above, you can see that the bottom of the image is
            cut off on wider screens, and that the sides get cut off on portrait
            screens. Regardless, there will never be any gaps or “open” space,
            and the image will always adjust to accomodate proper filling.
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
