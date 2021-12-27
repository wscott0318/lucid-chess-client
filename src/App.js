import "./App.scss";
import "./components/UI/ui_common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react'

import GameSelect from "./components/UI/GameSelect/GameSelect";
import Level from "./components/UI/Level/Level";

import './components/UI/ui_common.css';

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

				{/* <JoinGame show={modalShow} onHide={() => setModalShow(false)}></JoinGame> */}
				{/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
				{/* <RoomsModal show={modalShow} onHide={() => setModalShow(false)}></RoomsModal> */}

			</div>
		</BrowserRouter>
	);
}

export default App;
