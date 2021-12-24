import "./App.css";
import Scene from "./components/Scene/Scene";
import Logo from "./components/UI/Logo/Logo"
import Popup from "./components/UI/Popup/Popup";
import Victory from "./components/UI/Victory/Victory";
import {useState} from 'react'
import "./components/UI/ui_common.css";

import { Game, move, status, moves, aiMove, getFen } from "js-chess-engine";
const game = new Game();

function App() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div className="App">
      {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
      {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
      <Victory show={modalShow} onHide={() => setModalShow(false)}></Victory>
      {/* <Scene game={game} /> */}
    </div>
  );
}

export default App;
