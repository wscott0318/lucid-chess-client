import './Loading.scss';

import star_full from '../../../assets/img/star.png'
import star_none from '../../../assets/img/star_none.png';
import { useEffect, useRef, useState } from 'react';

const starArray = [0, 1, 2, 3, 4, 5];

export const Loading = ({ title }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const timeInterval = useRef(0);

    useEffect(() => {
        timeInterval.current = setInterval(() => setCurrentTime(prev => prev + 1), 1000);

        return () => clearInterval(timeInterval.current)
    });

    return (
        <div className='loading'>
            <div className='loading__container' >
                <div className = "loading__stars" >
                    {
                        starArray.map((item, idx) => (
                            <img key={`star_${idx}`} className = "star" src= { (idx <= currentTime % starArray.length) ? star_full : star_none} alt="pic" />
                        ))
                    }
                </div>
                <div className = "loading__title" >
                    <p>{ title }</p>
                </div>
            </div>
        </div>
    )
}
export default Loading;