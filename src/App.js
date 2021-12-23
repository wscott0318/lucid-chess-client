import './App.css';
import { Game } from 'js-chess-engine'
import Scene from './components/Scene/Scene';
import { getRandomVal } from './utils/helper';
import { gameModes } from './utils/constant';

const game = new Game();

console.log(game);

// const side = getRandomVal(2) === 0 ? 'white' : 'black';
const side = 'white';
const mode = gameModes['P2E'];

function App() {
	return (
		<div className="App">
			<Scene game={game} side={side} mode={mode}/>
		</div>
	);
}

export default App;
