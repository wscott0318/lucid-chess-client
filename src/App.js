import "./App.css";
import "./components/UI/ui_common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scene from "./components/Scene/Scene";
import Logo from "./components/UI/Logo/Logo"
import Popup from "./components/UI/Popup/Popup";
import Victory from "./components/UI/Victory/Victory";
import Level from "./components/UI/Level/Level";
import GameSelect from "./components/UI/GameSelect/GameSelect";
import {useState} from 'react'
import Play2Earn from "./components/Play2Earn/Play2Earn";
import InviteFriend from "./components/InviteFriend/InviteFriend";
import CreateGame from "./components/CreateGame/CreateGame";
import Loading from "./components/Loading/Loading";
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


          {/* <JoinGame /> */}
          {/* <CreateGame /> */}
          {/* <InviteFriend /> */}
          {/* <Play2Earn/> */}
          {/* <Logo show={modalShow} onHide={() => setModalShow(false)}></Logo> */}
          {/* <Popup show={modalShow} onHide={() => setModalShow(false)}></Popup> */}
          {/* <Victory show={modalShow} onHide={() => setModalShow(false)}></Victory> */}
          {/* <Level show={modalShow} onHide={() => setModalShow(false)}></Level> */}
          {/* <Scene game={game} /> */}

				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
