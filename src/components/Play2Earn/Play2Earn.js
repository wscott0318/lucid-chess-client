import '../../assets/css/index.css';
import './Play2Earn.css';

import logo from '../../assets/image/chesslogo.png';
import ribbon from '../../assets/image/Play2earnRibbon.png';
import popup from '../../assets/image/popup.png';

export const Play2Earn = () => {

    return (
        <section>
          <img className = 'ribbon' src = {ribbon} />
          <div>
            <img className = "popup" src = {popup} />
            <img className = "chesslogo" src = {logo} />
            <div className = "group">
              <button className = "but1 joingameBut" ><span>Join Game</span></button>
              <button className = "but1" ><span>Create Game</span></button>
             </div>
          </div>
        </section>
    )
}
export default Play2Earn;