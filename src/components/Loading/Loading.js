import './Loading.css';

import backImage from '../../assets/image/background.png';
import star_full from '../../assets/image/star_full.png';

export const Loading = () => {

    return (
        <div >
            <div className = "loadDiv" >
                <img className = "star" src= {star_full} />
                <img className = "star" src= {star_full} />
                <img className = "star" src= {star_full} />
                <img className = "star" src= {star_full} />
                <img className = "star" src= {star_full} />
                <img className = "star" src= {star_full} />
            </div>
            <div className = "text" >
                <p>Waiting other player to join </p>
            </div>
        </div>
    )
}
export default Loading;