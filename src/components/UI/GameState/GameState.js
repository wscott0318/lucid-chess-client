import "./GameState.scss";

export const GameState = () => {
  return (
    <div className="GameState">
      <div className="u-header">
        <div className="u-you-container">
          <div className="u-black"></div>
          <div className="u-info">
            <div className="u-info-img"></div>
            <div className="u-info-name">You</div>
          </div>
          <div className="u-left-banner"></div>
        </div>
        <div className="u-time-container">
          <div className="u-time">00: 17</div>
          <div className="u-clock"></div>
          <div className="u-time">00: 03</div>
        </div>
        <div className="u-opponent-container">
          <div className="u-black"></div>
          <div className="u-info">
            <div className="u-info-img"></div>
            <div className="u-info-name">Alex</div>
          </div>
          <div className="u-right-banner"></div>
        </div>
      </div>
      <div className="u-footer">
        <div className="u-back"></div>
        <div className="u-footer-right">
          <div className="u-undo"></div>
          <div className="u-setting"></div>
        </div>
      </div>
    </div>
  );
};

export default GameState;
