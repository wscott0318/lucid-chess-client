import "./App.scss";
import "./components/UI/ui_common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react'

import GameSelect from "./components/UI/GameSelect/GameSelect";

import Level from "./components/UI/Level/Level";

import Logo from "./components/UI/Logo/Logo";
import './components/UI/ui_common.css';

import Popup from "./components/UI/Popup/Popup";
// import RoomsModal from "./components/UI/RoomsModal/RoomsModal";
import PawnModal from "./components/UI/PawnModal/PawnModal";
import Victory from "./components/UI/Victory/Victory";

import JoinGame from "./components/UI/JoinGame/JoinGame";

import ModeSelect from './views/ModeSelect';
import FriendPlay from './views/ModeSelect/FriendPlay';
import GameScene from './views/GameScene';

import RoomsModal from './components/UI/RoomsModal/RoomsModal';

function App() {
  	const [modalShow, setModalShow] = useState(true);
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<GameSelect />} />
					<Route path="/friendPlay/*" element={<FriendPlay />} />
					<Route path="/machinePlay" element={<Level />}  />
					<Route path="/gameScene" element={<GameScene />} />
				</Routes>

				
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
			</div>
		</BrowserRouter>
	);
}

export default App;
