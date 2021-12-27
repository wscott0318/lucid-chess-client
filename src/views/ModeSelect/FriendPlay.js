import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { gameModes, userTypes } from "../../utils/constant";

const CreateGame = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const createAction = () => {
        navigate('/gameScene', { state: { mode: gameModes['P2P'], friendMatch: true, username: name, userType: userTypes['creator'] }});
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30%' }}>
            <input placeholder="enter name" onChange={(e) => setName(e.target.value)} />
            <button onClick={createAction}>Create</button>
        </div>
    )
}

const JoinGame = () => {
    const [name, setName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const navigate = useNavigate();

    const joinAction = () => {
        navigate('/gameScene', { state: { mode: gameModes['P2P'], friendMatch: true, username: name, userType: userTypes['joiner'], roomId: secretKey }});
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30%' }}>
            <input placeholder="enter name" onChange={(e) => setName(e.target.value)}/>
            <input placeholder="secret key" onChange={(e) => setSecretKey(e.target.value)}/>
            <button onClick={joinAction}>Join</button>
        </div>
    )
}

const Select = () => {
    return (
        <div>
            <button style={{ padding: 20 }}>
                <Link to="/friendPlay/create">Create Game</Link>
            </button>
            <button style={{ padding: 20 }}>
                <Link to="/friendPlay/join">Join Game</Link>
            </button>
        </div>
    )
}

export const FriendPlay = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<Select />} />
                <Route path="create" element={<CreateGame />} />
                <Route path="join" element={<JoinGame />} />
            </Routes>
        </div>
    )
}

export default FriendPlay;