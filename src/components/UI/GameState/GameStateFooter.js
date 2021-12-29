import "./GameStateFooter.scss";

export const GameStateFooter = () => {
  return (
    <div className="GameStateFooter">
      <div className="u-back"></div>
      <div className="u-footer-right">
        <div className="u-undo"></div>
        <div className="u-setting"></div>
        <div className="u-left-volcano"></div>
        <div className="u-right-volcano"></div>
        <div className="u-fore-volcano"></div>
      </div>
    </div>
  );
};

export default GameStateFooter;
