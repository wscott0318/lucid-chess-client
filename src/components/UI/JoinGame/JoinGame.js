import { useNavigate } from "react-router-dom";
import { gameModes, userTypes } from "../../../utils/constant";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./JoinGame.scss";

export const JoinGame = () => {
    const [name, setName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigate = useNavigate();

    const joinAction = () => {
		if( name === '' || secretKey === '' )
			return;

        navigate('/gameScene', { state: { mode: gameModes['P2P'], friendMatch: true, username: name, userType: userTypes['joiner'], roomId: secretKey }});
    }

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