import React from "react";
import {Modal, ModalBody} from "reactstrap";

import './LogoModal.scss';


class LogoModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
                <Modal
                    {...this.props}
                    isOpen={true}
                    // toggle={this.toggleModal}
                    className="logo-modal"
                >
                    <ModalBody>
                        <div className="logo-image">
                        </div>
                    </ModalBody>
                </Modal>
        )
    }
}

export default LogoModal;