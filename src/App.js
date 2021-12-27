import "./App.css";
import Scene from "./components/Scene/Scene";
import Logo from "./components/UI/Logo/Logo";
import Popup from "./components/UI/Popup/Popup";
import Victory from "./components/UI/Victory/Victory";
import Level from "./components/UI/Level/Level";
import GameSelect from "./components/UI/GameSelect/GameSelect";
import JoinGame from "./components/UI/JoinGame/JoinGame";
import { useState } from "react";
import "./components/UI/ui_common.css";
import Play2Earn from "./components/Play2Earn/Play2Earn";
import InviteFriend from "./components/InviteFriend/InviteFriend";
import CreateGame from "./components/CreateGame/CreateGame";
import Loading from "./components/Loading/Loading";
import JoinGames from "./components/JoinGame/JoinGame";

import { Game, move, status, moves, aiMove, getFen } from "js-chess-engine";
const game = new Game();

function App() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div className="App">
      {/* <JoinGames /> */}
      {/* <CreateGame /> */}
      {/* <InviteFriend /> */}
      {/* <Play2Earn/> */}
      {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
      {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
      {/* <Victory show={modalShow} onHide={() => setModalShow(false)}></Victory> */}
      {/* <Level show={modalShow} onHide={() => setModalShow(false)}></Level> */}
      {/* <GameSelect
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></GameSelect> */}
      {/* <Scene game={game} /> */}
      <JoinGame show={modalShow} onHide={() => setModalShow(false)}></JoinGame>
    </div>
  );
}

export default App;
