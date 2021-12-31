import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Connect.scss";

const arrInfo = {
  connect: {
    text: "Your need ...",
    button: "Connect Wallet",
  },
  join: {
    text: "Your need1 ...",
    button: "Connect Wallet1",
  },
  deposit: {
    text: "Your need2 ...",
    button: "Connect Wallet2",
  },
};

export const Connect = () => {
	const location = useLocation();
	console.log(location);
  const [stage, setStage] = useState("connect");

  const nextStage = () => {
    switch (stage) {
      case "connect":
        setStage("join");
        break;
      case "join":
        setStage("deposit");
        break;
      case "deposit":
        break;
    }
  };

  return (
    <div className="Connect">
      <div className="u-container">
        <div className="u-ribbon">Play to earn</div>
        <div className="u-content">
          <div className="u-content-container">
            <div className="u-text">Text</div>
            <div className="u-button" onClick={() => nextStage()}>
              Button
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
