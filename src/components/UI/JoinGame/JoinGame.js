import '../../../assets/css/index.css';
import './JoinGame.css';


import logo from '../../../assets/image/chesslogo.png';
import ribbon from '../../../assets/image/joingameRibbon.png';
import popup from '../../../assets/image/popup.png';

export const JoinGame = () => {

    return (
        <section className = 'joingame' >
          <div>
            <img className = 'ribbon' src = {ribbon} />
            <img className = "popup joinPopup" src = {popup} />
            <div className = 'joinCommentDiv' >
                <span className = "shareCommnet">Name must have minimum 2 and maximum 20 characters.</span>              
            </div>
            <div className = "group">
              <input className = "inputName inputKey" placeholder='Enter your name' placeholderTextColor="#84617B" type = 'text' ></input>
              <input className = "inputName inputJoin" placeholder='Secret Key' placeholderTextColor="#84617B" type = 'text' ></input>
              <button className = "but1 joinBut" ><span>Join</span></button>
           </div>
          </div>
        </section>
    )
}
export default JoinGame;