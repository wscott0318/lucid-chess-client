import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PawnModal.scss";

import ICON_KNIGHT from "../../../assets/img/pawn_knight_icon.png";
import ICON_BISHOP from "../../../assets/img/pawn_bishop_icon.png";
import ICON_ROOK from "../../../assets/img/pawn_rook_icon.png";
import ICON_QUEEN from "../../../assets/img/pawn_queen_icon.png";
import BG_KNIGHT from "../../../assets/img/pawn_knight_bg.png";
import BG_BISHOP from "../../../assets/img/pawn_bishop_bg.png";
import BG_ROOK from "../../../assets/img/pawn_rook_bg.png";
import BG_QUEEN from "../../../assets/img/pawn_queen_bg.png";
import SYMBOL_KNIGHT from "../../../assets/img/pawn_knight_wolf.png";
import SYMBOL_BISHOP from "../../../assets/img/pawn_bishop_cyborg.png";
import SYMBOL_ROOK from "../../../assets/img/pawn_rook_dragon.png";
import SYMBOL_QUEEN from "../../../assets/img/pawn_queen_medusa_fox.png";
import { useState } from "react";

const PAWN_ITEMS = [
    {
        type: "Knight",
        icon: ICON_KNIGHT,
        desc: "Cerberus",
        bg: BG_KNIGHT,
        symbol: SYMBOL_KNIGHT,
        width: "12vw",
        height: "13vw",
        top: "-4vw",
    },
    {
        type: "Bishop",
        icon: ICON_BISHOP,
        desc: "Keo502",
        bg: BG_BISHOP,
        symbol: SYMBOL_BISHOP,
        width: "9vw",
        height: "13vw",
        top: "-5.7vw",
    },
    {
        type: "Rook",
        icon: ICON_ROOK,
        desc: "Bahamut",
        bg: BG_ROOK,
        symbol: SYMBOL_ROOK,
        width: "14vw",
        height: "12vw",
        top: "-4vw",
    },
    {
        type: "Queen",
        icon: ICON_QUEEN,
        desc: "Medusa/Sakura",
        bg: BG_QUEEN,
        symbol: SYMBOL_QUEEN,
        width: "12vw",
        height: "13vw",
        top: "-5.7vw",
    }
];

export const PawnModal = ({ show, pawnTransform }) => {
    const [currentPiece, setCurrentPiece] = useState(null);
    
    return (
        <Modal
            className="pawn-modal"
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="pawn">
                <div className="pawn-desc">
                    Your Pawn has reach the endpoint, please choose a Character to transform
                </div>
                <div className="pawn-cards">
                    {
                        PAWN_ITEMS.map((item, index) => (
                            <div className={`pawn-card ${ currentPiece === item.type ? 'active' : '' }`} key={index} style={{backgroundImage: `url(${item.bg})`}} onClick={() => setCurrentPiece(item.type)}>
                                <div className="pawn-card-symbol-image" style={{backgroundImage: `url(${item.symbol})`, width: item.width, height: item.height, top: item.top}}></div>
                                <div className="pawn-card-content">
                                    <div className="pawn-card-content-header">
                                        <img className="pawn-card-content-header-icon" src={item.icon} alt="pic"></img>
                                        <div className="pawn-card-content-header-title">{item.type}</div>
                                    </div>
                                    <div className="pawn-card-content-desc">{item.desc}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="pawn-button" onClick={() => pawnTransform(currentPiece)}>
                    Confirm
                </div>
            </div>
        </Modal>
    );
}

export default PawnModal;