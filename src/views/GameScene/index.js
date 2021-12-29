import { useLocation } from "react-router-dom";
import { Game } from 'js-chess-engine'

import Scene from "./GameScene";
import { gameModes } from "../../utils/constant";
import { getRandomVal } from "../../utils/helper";

const game = new Game();

// game.board.configuration.turn = 'black';
console.error(game);
// console.log(game.moves());

export const GameScene = () => {
    const location = useLocation();
    const color = [ 'white', 'black' ];
    const side = location.state.mode === gameModes['P2E'] ? color[getRandomVal(2)] : null;

    return (
        <div>
            <Scene game={game} {...location.state} side={ side } />
        </div>
    )
}

export default GameScene;