import "./App.scss";
import Scene from "./components/Scene/Scene";
import Logo from "./components/UI/Logo"
import Popup from "./components/UI/Popup/Popup";
import RoomsModal from "./components/UI/RoomsModal/RoomsModal";
import PawnModal from "./components/UI/PawnModal/PawnModal";


import {useState} from 'react'

import { Game, move, status, moves, aiMove, getFen } from "js-chess-engine";
const game = new Game();

function App() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div className="App">
      {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
      {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
      {/* <RoomsModal show={modalShow} onHide={() => setModalShow(false)}></RoomsModal> */}
      <PawnModal show={modalShow} onHide={() => setModalShow(false)} />
      {/* <Scene game={game} /> */}
    </div>
  );
}

export default App;
