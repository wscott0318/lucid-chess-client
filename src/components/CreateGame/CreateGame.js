import '../../assets/css/index.css';

import logo from '../../assets/image/chesslogo.png';
import ribbon from '../../assets/image/createGameRibbon.png';
import popup from '../../assets/image/popup.png';

export const CreateGame = () => {

    return (
        <section className = 'joingame' >
          <div>
            <img className = 'ribbon' src = {ribbon} />
            <img className = "popup" src = {popup} />
            <img className = "chesslogo" src = {logo} />
            <div className = "group">
              <input className = "inputName" placeholder='Enter your name' placeholderTextColor="#84617B" type = 'text' ></input>
              <button className = "but1" ><span>Create</span></button>
           </div>
          </div>
        </section>
    )
}
export default CreateGame;