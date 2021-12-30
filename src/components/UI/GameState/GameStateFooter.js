import "./GameStateFooter.scss";

export const GameStateFooter = ({quitAction}) => {

  return (
    <div className="GameStateFooter">
      <div className="u-back"></div>
      <div className="u-footer-right">
        <div className="u-undo" onClick={quitAction}></div>
        <div className="u-setting"></div>
      </div>
    </div>
  );
};

export default GameStateFooter;
