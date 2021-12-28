import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomsModal.scss";

import ICON_CLASSIC from "../../../assets/img/classic_header.png";
import ICON_SILVER from "../../../assets/img/1v1_silver_header.png";
import ICON_GOLD from "../../../assets/img/1v1_gold_header.png";
import ICON_PLATINUM from "../../../assets/img/1v1_platinum_header.png";
import ICON_DIAMOND from "../../../assets/img/1v1_diamond_header.png";
import BG_CLASSIC from "../../../assets/img/classic_bg.png";
import BG_SILVER from "../../../assets/img/silver_bg.png";
import BG_GOLD from "../../../assets/img/1v1_gold_bg.png";
import BG_PLATINUM from "../../../assets/img/1v1_platinum_bg.png";
import BG_DIAMOND from "../../../assets/img/1v1_diamond_bg.png";

const ROOMS = [
    {
        name: "Classic Room",
        pool: "Pool: No rewards",
        desc: "Players can play for free 1v1 against another player",
        icon: ICON_CLASSIC,
        bg: BG_CLASSIC,
    },
    {
        name: "Silver Room",
        pool: "Pool: 98 $LLG",
        desc: "Each player needs to put in 50 $LLG",
        icon: ICON_SILVER,
        bg: BG_SILVER,
    },
    {
        name: "Gold Room",
        pool: "Pool: 198 $LLG",
        desc: "Each player needs to put in 100 $LLG",
        icon: ICON_GOLD,
        bg: BG_GOLD,
    },
    {
        name: "Platinum Room",
        pool: "Pool: 392 $LLG",
        desc: "Each player needs to put in 200 $LLG",
        icon: ICON_PLATINUM,
        bg: BG_PLATINUM,
    },
    {
        name: "Diamond Room",
        pool: "Pool: 980 $LLG",
        desc: "Each player needs to put in 500 $LLG",
        icon: ICON_DIAMOND,
        bg: BG_DIAMOND,
    }
];

export default class RoomsModal extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Modal
        className="rooms"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="rooms-container">
            <div className="rooms-container-header">1 VS 1 MODE</div>
            <div className="rooms-container-content">
                <p className="rooms-container-content-desc">Have 5 Diffrent rooms. Two players each put in the specifiedamount of $ LLG 9 base on theroom type) into a pool. After each Game , whoever wins the game takes all $ LLG in the pool</p>
                <div className="rooms-container-content-rooms">
                    {
                        ROOMS.map((room, index) => (
                            <div className="rooms-container-content-room" style={{backgroundImage: `url(${room.bg})`}}>
                                <div className="rooms-container-content-room-icon" style={{backgroundImage: `url(${room.icon})`}}></div>
                                <div className="rooms-container-content-room-texts">
                                    <div className="rooms-container-content-room-name">{room.name}</div>
                                    <div className="rooms-container-content-room-pool">{room.pool}</div>
                                    <div className="rooms-container-content-room-desc">{room.desc}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
      </Modal>
    );
  }
}
