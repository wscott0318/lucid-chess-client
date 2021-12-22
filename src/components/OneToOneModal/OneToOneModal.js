import React from "react";
import {Modal, ModalBody} from "reactstrap";

import './OneToOneModal.scss';


class OneToOneModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
                <Modal
                    {...this.props}
                    isOpen={true}
                    // toggle={this.toggleModal}
                    className="one-to-one-modal"
                >
                    <ModalBody>
                        <div className="one-to-one-header">
                            1 VS 1 MODE
                        </div>
                        <div className="one-to-one-desc">
                            Have 5 different rooms. Two players each put in the specified amount of $ LLG 9 base on the room type into a pool. After each game, whoever wins the game takes all $ LLG in the pool
                        </div>
                        <div className="one-to-one-rooms">
                            <div className="one-to-one-room classic">
                                <div className="one-to-one-room-icon"></div>
                                <div className="one-to-one-room-title">Classic Room</div>
                                <div className="one-to-one-room-subtitle">Pool: No rewards</div>
                                <div className="one-to-one-room-desc">Players can play for free 1v1 against another player</div>
                            </div>
                            <div className="one-to-one-room silver">
                                <div className="one-to-one-room-icon"></div>
                                <div className="one-to-one-room-title">Silver Room</div>
                                <div className="one-to-one-room-subtitle">Pool: 98 $ LLG</div>
                                <div className="one-to-one-room-desc">Each player needs to put in 50 $LLG</div>
                            </div>
                            <div className="one-to-one-room gold">
                                <div className="one-to-one-room-icon"></div>
                                <div className="one-to-one-room-title">Gold Room</div>
                                <div className="one-to-one-room-subtitle">Pool: 198 $LLG</div>
                                <div className="one-to-one-room-desc">Each player needs to put in 100 $LLG</div>
                            </div>
                            <div className="one-to-one-room platinum">
                                <div className="one-to-one-room-icon"></div>
                                <div className="one-to-one-room-title">Platinum Room</div>
                                <div className="one-to-one-room-subtitle">Pool: 392 $LLG</div>
                                <div className="one-to-one-room-desc">Each player needs to put in 200 $LLG</div>
                            </div>
                            <div className="one-to-one-room diamond">
                                <div className="one-to-one-room-icon"></div>
                                <div className="one-to-one-room-title">Diamond Room</div>
                                <div className="one-to-one-room-subtitle">Pool: 980 $LLG</div>
                                <div className="one-to-one-room-desc">Each player needs to put in 500 $LLG</div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
        )
    }
}

export default OneToOneModal;