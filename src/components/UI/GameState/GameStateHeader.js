import "./GameStateHeader.scss";

export const GameStateHeader = ({ opponentName, myTurn, remainingTime }) => {
  const formatTime = (time) => {
    if (!time) {
      return "-- : --";
    }

    const minutes =
      Math.floor(time / 60) < 10
        ? "0" + Math.floor(time / 60)
        : Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;

    return minutes + " : " + seconds;
  };

  return (
    <div className="GameStateHeader">
      <div className="u-you-container">
        <div className="u-black"></div>
        <div className="u-info">
          <div className="u-info-img-back">
            <div className="u-info-img"></div>
          </div>
          <div className="u-info-name">You</div>
        </div>
        <div className={`u-left-banner ${myTurn ? "show" : "hide"}`}></div>
      </div>

      <div className="u-time-container">
        <div className={`u-time`}>
          {myTurn ? formatTime(remainingTime) : "-- : --"}
        </div>
        <div className="u-clock"></div>
        <div className={`u-time`}>
          {!myTurn ? formatTime(remainingTime) : "-- : --"}
        </div>
      </div>

      <div className="u-opponent-container">
        <div className="u-black"></div>
        <div className="u-info">
          <div className="u-info-img-back">
            <div className="u-info-img"></div>
          </div>
          <div className="u-info-name">{opponentName}</div>
        </div>
        <div className={`u-right-banner ${!myTurn ? "show" : "hide"}`}></div>
      </div>
    </div>
  );
};

export default GameStateHeader;
