import { Link } from "react-router-dom";
import { gameModes } from "../../utils/constant";

export const ModeSelect = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{ padding: 20 }}>
                <Link to="/mathPlay">Math Matching</Link>
            </button>
            <button style={{ padding: 20 }}>
                <Link to="/friendPlay">Friend Matching</Link>
            </button>
            <button style={{ padding: 20 }}>
                <Link to={{ pathname:"/machinePlay"}} state={{ mode: gameModes['P2E'] }}>Play with AI</Link>
            </button>
        </div>
    )
}

export default ModeSelect;