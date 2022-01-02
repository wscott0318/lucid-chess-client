import { useNavigate } from "react-router-dom";
import { gameModes, userTypes } from "../../../utils/constant";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { socketServerPort } from "../../../config";
import { socketEvents } from "../../../utils/packet";
import store from "../../../store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./JoinGame.scss";

export const JoinGame = () => {
    const [name, setName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigate = useNavigate();
	const [ socket, setSocket ] = useState();

    const updateSocket = store( state => state.updateSocket );

    const joinAction = () => {
		if( name === '' || secretKey === '' )
			return;

		const data = {};
		data.username = name;
		data.friendMatch = true;
		data.roomId = secretKey;

		socket.emit( socketEvents['CS_JoinRoom'], data );
    }

	const handleJoinRoom = ( params ) => {
		const { roomName, roomKey } = params;
		
		const stateData = {
			mode: gameModes['P2P'],
			friendMatch: true,
			username: name,
			userType: userTypes['joiner'],
			roomId: secretKey,
			roomName: roomName,
			roomKey: roomKey,
		}

		if (roomName === 'Classic Room') {
            navigate('/gameScene', { state: { ...stateData } });
        } else {
            navigate('/connect', { state: { ...stateData } });
        }
	}

	useEffect(() => {
        const skt = io.connect(`http://${window.location.hostname}:${socketServerPort}`);
        setSocket( skt );

        skt.on( socketEvents['SC_JoinRoom'], (params) => handleJoinRoom(params) );

		updateSocket( skt );
    }, []);

    return (
		<div className="JoinGame">
			<div className="u-container">
				<div className="u-ribbon">Join game</div>

				<div className="u-content">
					<div className="u-description">
						Name must have minimum 2 and maximum 20 characters
					</div>

					<div className="u-input-wrap">
						<input
							className="u-input"
							type="text"
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' ? joinAction() : null}
						/>
					</div>

					<div className="u-input-wrap">
						<input
							className="u-input"
							type="text"
							placeholder="Secret key"
							onChange={(e) => setSecretKey(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' ? joinAction() : null}
						/>
					</div>

					<button className="u-button" onClick={joinAction}>Join</button>
				</div>
			</div>
		</div>
    );
}

export default JoinGame;