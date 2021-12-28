import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameSelect from "./components/UI/GameSelect/GameSelect";
import Level from "./components/UI/Level/Level";
import FriendPlay from "./views/FriendPlay";
import GameScene from "./views/GameScene";
import MatchPlay from "./views/MatchPlay";

// import GameState from "./components/UI/GameState/GameState";

function App() {
  return (
    <BrowserRouter>
    	<div className="App">
    		<Routes>
    			<Route path="/" element={<GameSelect />} />
    			<Route path="/matchPlay" element={<MatchPlay />} />
    			<Route path="/friendPlay/*" element={<FriendPlay />} />
    			<Route path="/machinePlay" element={<Level />}  />
    			<Route path="/gameScene" element={<GameScene />} />
    		</Routes>
    	</div>
    </BrowserRouter>

    // <GameState></GameState>
  );
}

export default App;
