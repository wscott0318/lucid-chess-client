import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomsScreen.scss";

import { gameModes } from "../../../utils/constant";

import ICON_CLASSIC from "../../../assets/img/1v1_classic_header.png";
import ICON_SILVER from "../../../assets/img/1v1_silver_header.png";
import ICON_GOLD from "../../../assets/img/1v1_gold_header.png";
import ICON_PLATINUM from "../../../assets/img/1v1_platinum_header.png";
import ICON_DIAMOND from "../../../assets/img/1v1_diamond_header.png";
import BG_CLASSIC from "../../../assets/img/1v1_classic_bg.png";
import BG_SILVER from "../../../assets/img/1v1_silver_bg.png";
import BG_GOLD from "../../../assets/img/1v1_gold_bg.png";
import BG_PLATINUM from "../../../assets/img/1v1_platinum_bg.png";
import BG_DIAMOND from "../../../assets/img/1v1_diamond_bg.png";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { socketServerPort } from "../../../config";
import { socketEvents } from "../../../utils/packet";
import store from "../../../store/store";

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

const RoomsScreen = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [ socket, setSocket ] = useState();

    const updateSocket = store( state => state.updateSocket );

    const onClickRoom = (roomName) => {
        if( roomName !== 'Classic Room' )
            return;

        const data = {};
        data.roomName = roomName;
        data.username = state.username;
        data.friendMatch = state.friendMatch;

        if( !state.friendMatch ) {
            socket.emit( socketEvents['CS_MatchPlayLogin'], data );

            // const stateData = {
            //     mode: gameModes['P2P'],
            //     friendMatch: state.friendMatch,
            //     username: state.username,
            //     roomName: roomName,
            // }
    
            // if (roomName === 'Classic Room') {
            //     navigate('/gameScene', { state: { ...stateData } });
            // } else {
            //     navigate('/connect', { state: { ...stateData } });
            // }
        } else {
            socket.emit( socketEvents['CS_CreateRoom'], data );
        }
    }

    const handleRoomCreated = (params) => {
        const { roomId, roomName, roomKey } = params;

        const stateData = {
            mode: gameModes['P2P'],
            friendMatch: state.friendMatch,
            username: state.username,
            roomName: roomName,
            roomId: roomId,
            roomKey: roomKey,
        }

        if (roomName === 'Classic Room' && state.friendMatch === true) {
            navigate('/gameScene', { state: { ...stateData } });
        } else {
            navigate('/connect', { state: { ...stateData } });
        }
    }

    useEffect(() => {
        const skt = io.connect(`http://${window.location.hostname}:${socketServerPort}`);
        setSocket( skt );

        skt.on( socketEvents['SC_RoomCreated'], (params) => handleRoomCreated(params) );

        updateSocket( skt );
    }, []);

    return (
      <div
        className="rooms"
      >
        <div className="rooms-container">
            <div className="rooms-container-header">1 VS 1 MODE</div>
            <div className="rooms-container-content">
                <p className="rooms-container-content-desc">There are 5 different rooms. Two players each put in the specified amount of LLG (based on the room type) into a pool. After each game, whoever wins the game takes all the LLG in the pool.</p>
                <div className="rooms-container-content-rooms">
                    {
                        ROOMS.map((room, index) => (
                            <div className={`rooms-container-content-room ${ room.name !== 'Classic Room' ? 'closed' : '' }`} key={index} style={{backgroundImage: `url(${room.bg})`}} onClick={() => onClickRoom(room.name)}>
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
      </div>
    );
}

export default RoomsScreen;
