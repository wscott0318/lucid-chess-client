import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logoPng from "../../../assets/img/logo.png";
import "./Logo.scss";

export default class Logo extends Component {
    render() {
		return (
			<div className="logo">
				<img src={logoPng} alt="pic"></img>
			</div>
		);
    }
}
