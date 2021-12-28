import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateGame.scss";
import { gameModes, userTypes } from "../../../utils/constant";
import { useState } from "react";

export const CreateGame = () => {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const createAction = () => {
		if( name === '' )
			return;

        navigate('/gameScene', { state: { mode: gameModes['P2P'], friendMatch: true, username: name, userType: userTypes['creator'] }});
    }

    return (
        <div className="CreateGame">
			<div className="u-container">
				<div className="u-ribbon">Create game</div>
				<div className="u-content">
					<div className="u-logo"></div>

					<div className="u-input-wrap">
						<input
							className="u-input"
							type="text"
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="u-buttongroup">
						<button className="u-button" onClick={createAction}>Create</button>
					</div>
				</div>
			</div>
        </div>
    )
}

export default CreateGame;