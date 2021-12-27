import {useState} from 'react'
import "./App.scss";
import Scene from "./components/Scene/Scene";
import Logo from "./components/UI/Logo/Logo";
import Popup from "./components/UI/Popup/Popup";
import RoomsModal from "./components/UI/RoomsModal/RoomsModal";
import PawnModal from "./components/UI/PawnModal/PawnModal";
import Victory from "./components/UI/Victory/Victory";
import Level from "./components/UI/Level/Level";
import GameSelect from "./components/UI/GameSelect/GameSelect";
import JoinGame from "./components/UI/JoinGame/JoinGame";

import { Game, move, status, moves, aiMove, getFen } from "js-chess-engine";
const game = new Game();

function App() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div className="App">
      {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
      {/* <JoinGame show={modalShow} onHide={() => setModalShow(false)}></JoinGame> */}
      {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
      {/* <RoomsModal show={modalShow} onHide={() => setModalShow(false)}></RoomsModal> */}
      {/* <PawnModal show={modalShow} onHide={() => setModalShow(false)} /> */}
      {/* <Victory show={modalShow} onHide={() => setModalShow(false)}></Victory> */}
      {/* <Level show={modalShow} onHide={() => setModalShow(false)}></Level> */}
      <GameSelect
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></GameSelect>
      {/* <Scene game={game} /> */}
    </div>
  );
}

export default App;
