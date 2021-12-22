import React from 'react';

import './BoardControls.scss';

class BoardControls extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickPlayer = () => {

    }

    render () {
        return (
            <div className="board-controls">
                <div className="player" onClick={this.onClickPlayer}>You</div>
                <div className="opponent">Alex</div>
                <div className="backButton">Back</div>
                <div className="refresh">Refresh</div>
                <div className="settings">Settings</div>
            </div>
        )
    }
}

export default BoardControls;