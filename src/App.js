import './App.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import Scene from './components/Scene/Scene';
import { getRandomVal } from './utils/helper';

const game = new Game();
console.log(game);

// const side = getRandomVal(2) === 0 ? 'white' : 'black';
const side = 'white';

function App() {
	return (
		<div className="App">
			<Scene game={game} side={side} />
		</div>
	);
}

export default App;
