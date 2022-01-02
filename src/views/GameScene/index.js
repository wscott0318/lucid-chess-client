import { useLocation } from "react-router-dom";
import { Game } from 'js-chess-engine'

import Scene from "./GameScene";
import { gameModes } from "../../utils/constant";
import { getRandomVal } from "../../utils/helper";

import store from "../../store/store";

const game = new Game();

console.error(game);

export const GameScene = () => {
    const location = useLocation();

    const color = [ 'white', 'black' ];
    const side = location.state.mode === gameModes['P2E'] ? color[getRandomVal(2)] : null;
    
    const socket = store( state => state.socket );

    return (
        <div>
            <Scene game={game} {...location.state} side={ side } socket={socket} />
        </div>
    )
}

export default GameScene;