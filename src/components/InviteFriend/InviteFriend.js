import "./InviteFriend.css";
import '../../assets/css/index.css';

import logo from '../../assets/image/chesslogo.png';
import ribbon from '../../assets/image/inviteRibbon.png';
import popup from '../../assets/image/popup.png';

export const InviteFriend = () => {

    return (
        <section>
          <img className = 'ribbon' src = {ribbon} />
          <div>
            <img className = "popup" src = {popup} />
            <div className = "codeDiv" >
              <input className = "inputName inputCode" placeholder='Key' placeholderTextColor="#84617B" type = 'text' ></input>
              <button className = "copyBut " />
            </div>
            <div className = 'joinCommentDiv' >
                <span className = "shareCommnet">Share the secrect key above, so  your friend can join this
game !</span>              
            </div>
            <div className = "group">
              <button className = "gotBut but1" ><span>Got It</span></button>
             </div>
          </div>
        </section>
    )
}
export default InviteFriend;