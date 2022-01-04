import './Inventory.scss';
import iceWall from '../../../assets/img/items/iceWall.png';
import petrify from '../../../assets/img/items/petrify.png';
import jumpyShoe from '../../../assets/img/items/jumpyShoe.png';

import { heroItems } from '../../../utils/constant';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const Inventory = ({ show, items, myTurn, selectItem, currentItem }) => {
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

        selectItem(item);
    }

    const renderIceWallTooltip = props => (
        <Tooltip {...props}>✅ Ice Wall - block movement in 3 space blocks</Tooltip>
    );

    const renderPetrifyTooltip = props => (
        <Tooltip {...props}>✅ Petrify - immobilize opponent's hero piece (except King or Queen)</Tooltip>
    );

    const renderJumpyShoeTooltip = props => (
        <Tooltip {...props}>✅ Jumpy Shoe - Jump over obstacle</Tooltip>
    );

    const enteringAction = (e) => {
        e.children[0].style.borderBottomColor  = '#0000008c';
        e.children[1].style.backgroundColor = '#0000008c';
    }

    return (
        <div className={`inventory ${ show ? 'show' : 'hide' }`}>
            <div className='inventory__wrapper'>
                <OverlayTrigger placement="top" overlay={renderIceWallTooltip} onEntering={enteringAction}>
                    <div 
                        className={`item ${ isEnable(heroItems['iceWall']) ? 'enable' : 'disable' } ${ isEnable(heroItems['iceWall']) && currentItem === heroItems['iceWall'] ? 'active' : '' }`} 
                        onClick={() => itemSelectAction( heroItems['iceWall'] )}
                    >
                        <img alt="pic" src={iceWall}></img>
                    </div>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={renderPetrifyTooltip} onEntering={enteringAction}>
                    <div 
                        className={`item ${ isEnable(heroItems['petrify']) ? 'enable' : 'disable' } ${ isEnable(heroItems['petrify']) && currentItem === heroItems['petrify'] ? 'active' : '' }`} 
                        onClick={() => itemSelectAction( heroItems['petrify'] )}
                    >
                        <img alt="pic" src={petrify}></img>
                    </div>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={renderJumpyShoeTooltip} onEntering={enteringAction}>
                    <div 
                        className={`item ${ isEnable(heroItems['jumpyShoe']) ? 'enable' : 'disable' } ${ isEnable(heroItems['jumpyShoe']) && currentItem === heroItems['jumpyShoe'] ? 'active' : '' }`} 
                        onClick={() => itemSelectAction( heroItems['jumpyShoe'] )}
                    >
                        <img alt="pic" src={jumpyShoe}></img>
                    </div>
                </OverlayTrigger>
            </div>
        </div>
    )
}

export default Inventory;