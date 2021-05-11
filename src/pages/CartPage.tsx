import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import {Link} from 'react-router-dom';
import { SetBadgeColor, priceDecimalFormat } from '../services';

const CartPage = () => {
    const {cart} = useContext(GlobalContext);

    if (cart.length === 0) {
    return (
        <div className="row text-center mt-5">
            <div className="col">
                <h2>No Items in Your Cart! Click <Link to='/'>here</Link> to shop some great
                {''} </h2>
            </div>
        </div>
    );
    }
    return <div id='cart'>
        <div className="row text-center">
            <div className="col">
                <h2>Cart Page!</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-8 offset-md-2">
                <ul className="list-group">
                    {
                        cart.map((cartItem) => {
                            return (
                                <li className="list-group-item" key={cartItem.id}>
                                    <div className='row'>
                                        <div className="col-sm-12 col-md-2">
                                            <div className="cart-item-img-container text-center">
                                            <img src={cartItem.product.image} alt="" />

                                        </div>
                                    </div>
                                    <div>
                                    <div className="col-sm-12 col-md-8">
                                        <div className="cart-item-body">
                                            <h3>{cartItem.product.title}</h3>
                                        </div>
                                        <span className={`badge ${SetBadgeColor(cartItem.product.category)}`}>
                                            {cartItem.product.category}
                                        </span>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2">
                                        <div className="cart-item-price">
                                            <div className="item-price">
                                                <div>
                                                    {priceDecimalFormat(+cartItem.price * cartItem.quantity)}
                                                </div>
                                            </div>
                                            <div className="item-quantity"></div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    </div>
}

export default CartPage;