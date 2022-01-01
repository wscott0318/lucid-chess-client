import { Routes, Route } from "react-router-dom";

import Play2Earn from "../../components/UI/Play2Earn/Play2Earn";
import CreateGame from "../../components/UI/CreateGame/CreateGame";
import JoinGame from "../../components/UI/JoinGame/JoinGame";
import RoomsScreen from "../../components/UI/RoomsScreen/RoomsScreen";

export const FriendPlay = () => {
    return (
        <div className="fullScreen">
            <Routes>
                <Route path="" element={<Play2Earn />} />
                <Route path="create" element={<CreateGame />} />
                <Route path="join" element={<JoinGame />} />
                <Route path="rooms" element={<RoomsScreen />} />
            </Routes>
        </div>
    )
}

export default FriendPlay;