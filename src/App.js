import "./components/UI/ui_common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {useState} from 'react'
// import Scene from "./components/Scene/Scene";
// import Logo from "./components/UI/Logo/Logo";

// import Scene from "./components/Scene/Scene";
// import Popup from "./components/UI/Popup/Popup";
// import RoomsModal from "./components/UI/RoomsModal/RoomsModal";
// import PawnModal from "./components/UI/PawnModal/PawnModal";
// import Victory from "./components/UI/Victory/Victory";
// import Level from "./components/UI/Level/Level";
// import GameSelect from "./components/UI/GameSelect/GameSelect";
// import JoinGame from "./components/UI/JoinGame/JoinGame";
import ModeSelect from './views/ModeSelect';
import FriendPlay from './views/ModeSelect/FriendPlay';
import GameScene from './views/GameScene';

function App() {
  // const [modalShow, setModalShow] = useState(true);
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<ModeSelect />} />
					<Route path="/friendPlay/*" element={<FriendPlay />} />
					<Route path="/gameScene" element={<GameScene />} />
					<Route path="/machinePlay" element={<GameScene />}  />
					<Route path="/matchPlay" element={<GameScene />}  />

          

          {/* <JoinGame /> */}
          {/* <CreateGame /> */}
          {/* <InviteFriend /> */}

          {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
          {/* <JoinGame show={modalShow} onHide={() => setModalShow(false)}></JoinGame> */}
          {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
          {/* <RoomsModal show={modalShow} onHide={() => setModalShow(false)}></RoomsModal> */}
          {/* <PawnModal show={modalShow} onHide={() => setModalShow(false)} /> */}
          {/* <Victory show={modalShow} onHide={() => setModalShow(false)}></Victory> */}
          {/* <Level show={modalShow} onHide={() => setModalShow(false)}></Level> */}
          {/* <GameSelect
            show={modalShow}
            onHide={() => setModalShow(false)}
          ></GameSelect> */}
          {/* <Scene game={game} /> */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
