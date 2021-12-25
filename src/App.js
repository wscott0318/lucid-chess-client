import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ModeSelect from './views/ModeSelect';
import FriendPlay from './views/ModeSelect/FriendPlay';
import GameScene from './views/GameScene';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<ModeSelect />} />
					<Route path="/friendPlay/*" element={<FriendPlay />} />
					<Route path="/gameScene" element={<GameScene />} />
					<Route path="/machinePlay" element={<GameScene />}  />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
