import './Inventory.scss';
import iceWall from '../../../assets/img/items/iceWall.png';
import petrify from '../../../assets/img/items/petrify.png';
import jumpyShoe from '../../../assets/img/items/jumpyShoe.png';

import { heroItems } from '../../../utils/constant';
import { useState } from 'react';

export const Inventory = ({ show, items, myTurn, selectItem }) => {
    const [currentItem, setCurrentItem] = useState();

    const isEnable = (type) => {
        if( !items )
            return false;

        const idx = items.findIndex((item) => item.type === type);
        if( idx !== -1 )
            return true;
        
        return false;
    }

    const itemSelectAction = (item) => {
        if( !myTurn )
            return;

        setCurrentItem(item);

        selectItem(item);
    }

    return (
        <div className={`inventory ${ show ? 'show' : 'hide' }`}>
            <div className='inventory__wrapper'>
                <div 
                    className={`item ${ isEnable(heroItems['iceWall']) ? 'enable' : 'disable' } ${ isEnable(heroItems['iceWall']) && currentItem === heroItems['iceWall'] ? 'active' : '' }`} 
                    onClick={() => itemSelectAction( heroItems['iceWall'] )}
                >
                    <img alt="pic" src={iceWall}></img>
                </div>
                <div 
                    className={`item ${ isEnable(heroItems['petrify']) ? 'enable' : 'disable' } ${ isEnable(heroItems['petrify']) && currentItem === heroItems['petrify'] ? 'active' : '' }`} 
                    onClick={() => itemSelectAction( heroItems['petrify'] )}
                >
                    <img alt="pic" src={petrify}></img>
                </div>
                <div 
                    className={`item ${ isEnable(heroItems['jumpyShoe']) ? 'enable' : 'disable' } ${ isEnable(heroItems['jumpyShoe']) && currentItem === heroItems['jumpyShoe'] ? 'active' : '' }`} 
                    onClick={() => itemSelectAction( heroItems['jumpyShoe'] )}
                >
                    <img alt="pic" src={jumpyShoe}></img>
                </div>
            </div>
        </div>
    )
}

export default Inventory;