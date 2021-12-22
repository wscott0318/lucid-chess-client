import React from "react";
import './App.scss';
import Scene from './components/Scene/Scene';
import BoardControls from './components/BoardControls/BoardControls';
import OneToOneModal from './components/OneToOneModal/OneToOneModal';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
const game = new Game();

function App() {
  const [modalShow, setModalShow] = React.useState(true);

  return (
    <div className="App">
      <Scene game={game} />
      <BoardControls />
      {/* <OneToOneModal 
        // show={modalShow}
        // onHide={() => setModalShow(false)}
      /> */}
    </div>
  );
}

export default App;
