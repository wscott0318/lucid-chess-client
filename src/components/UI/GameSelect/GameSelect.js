import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
import mode2Img from "../../../assets/img/select_game_friend.png";
import mode3Img from "../../../assets/img/select_game_computer.png";

export const GameSelect = () => {
    const navigate = useNavigate();

	const matchPlayAction = () => {
		navigate('/matchPlay');
	}

	const friendPlayAction = () => {
		navigate('/friendPlay');
	}

	const machinePlayAction = () => {
		navigate('/machinePlay');
	}

	return (
		<div className="GameSelect">
			<div className="u-container">
				<div className="u-ribbon">Select game</div>
				<div className="u-content">
					<div className="u-item" onClick={matchPlayAction}>
						<Image className="u-item-image" src={mode1Img}></Image>
						<div className="u-item-text">Match with Random User</div>
					</div>
					<div className="u-item" onClick={friendPlayAction}>
						<Image className="u-item-image" src={mode2Img}></Image>
						<div className="u-item-text">Match with Friend</div>
					</div>
					<div className="u-item" onClick={machinePlayAction}>
						<Image className="u-item-image" src={mode3Img}></Image>
						<div className="u-item-text">Match with Computer</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameSelect;