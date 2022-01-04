import "./GameStateFooter.scss";

export const GameStateFooter = ({quitAction, showInventoryAction, sendDrawRequest}) => {

  return (
    <div className="GameStateFooter">
      <div className="u-back" onClick={ showInventoryAction }></div>
      <div className="u-footer-right">
        <div className="u-undo" onClick={quitAction}></div>
        <div className="u-draw" onClick={ sendDrawRequest }></div>
      </div>
    </div>
  );
};

export default GameStateFooter;
