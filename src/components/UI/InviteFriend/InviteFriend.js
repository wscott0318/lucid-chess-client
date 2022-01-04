import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InviteFriend.scss";

export const InviteFriend = ({ show, hideAction, roomId }) => {
	const inputRef = useRef(null);

	const copyCodeToClipboard = () => {
		const el = inputRef.current;
		el.select();
		document.execCommand('copy');
	}

    return (
		<Modal
			className="Play2Earn"
			show={ show }
			onHide={ hideAction }
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<div className="u-container">
				<div className="u-ribbon">Invite Your friend</div>
				<div className="u-content">
				<div className="u-input-wrap">
					<input
						ref={ inputRef }
						className="u-input"
						type="text"
						placeholder="Secret key"
						readOnly
						value={roomId}
					></input>
					<button className="u-copy-button" onClick={copyCodeToClipboard}></button>
				</div>
					<div className="u-description">
						Share the secret key above, so  your friend can join this game!
					</div>
					<button className="u-button" onClick={hideAction}>Got it</button>
				</div>
			</div>
		</Modal>
    )
}

export default InviteFriend;