import './Inventory.scss';
import iceWall from '../../../assets/img/items/iceWall.png';
import petrify from '../../../assets/img/items/petrify.png';
import jumpyShoe from '../../../assets/img/items/jumpyShoe.png';

export const Inventory = ({ show, items }) => {
    const isEnable = (type) => {
        if( !items )
            return false;

        const idx = items.findIndex((item) => item.type === type);
        if( idx !== -1 )
            return true;
        
        return false;
    }

    return (
        <div className={`inventory ${ show ? 'show' : 'hide' }`}>
            <div className='inventory__wrapper'>
                <div className={`item ${ isEnable(0) ? 'enable' : 'disable' }`}>
                    <img alt="pic" src={iceWall}></img>
                </div>
                <div className={`item ${ isEnable(1) ? 'enable' : 'disable' }`}>
                    <img alt="pic" src={petrify}></img>
                </div>
                <div className={`item ${ isEnable(2) ? 'enable' : 'disable' }`}>
                    <img alt="pic" src={jumpyShoe}></img>
                </div>
            </div>
        </div>
    )
}

export default Inventory;