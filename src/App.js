import './App.css';
import Scene from './components/Scene/Scene';

import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
const game = new Game();

function App() {
  return (
    <div className="App">
      <Scene game={game} />
    </div>
  );
}

export default App;
