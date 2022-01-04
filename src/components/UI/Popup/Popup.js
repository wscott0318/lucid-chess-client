import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Popup.scss";

export const Popup = ({ show, type, message, agreeAction, disAgreeAction }) => {
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
							<div className="button-div" onClick={() => window.location = '/'}>Return</div> : null
					}

					{
						type === 'drawRequest' ? (
							<>
								<div className="button-div" onClick={ agreeAction }>Yes</div>
								<div className="button-div" onClick={ disAgreeAction }>No</div>
							</>
						) : null
					}
				</div>
			</div>
		</Modal>
    );
}

export default Popup;