import "./GameStateFooter.scss";

export const GameStateFooter = ({ showInventoryAction }) => {
  return (
    <div className="GameStateFooter">
      <div className="u-footer">
        <div className="u-back" onClick={ (showInventoryAction) }></div>
        <div className="u-footer-right">
          <div className="u-undo"></div>
          <div className="u-setting"></div>
        </div>
      </div>
    </div>
  );
};

export default GameStateFooter;
