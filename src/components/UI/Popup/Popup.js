import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Popup.scss";
import { useNavigate } from "react-router-dom";

export const Popup = ({ show, type, message }) => {
	const navigate = useNavigate();

    return (
		<Modal
			className="Popup"
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<div className="form">
				<div className="content">
					{ message }
				</div>
				<div className={`footer ${ type === 'leaveNotification' ? 'center' : '' }`}>
					{
						type === 'leaveNotification' ? 
							<div className="button-div" onClick={() => window.location = '/'}>Return Home</div> : null
					}
				</div>
			</div>
		</Modal>
    );
}

export default Popup;