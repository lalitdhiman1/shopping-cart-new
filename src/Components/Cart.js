import React from 'react'
import { Link } from 'react-router-dom';

 function Cart(props) {
    return (
        <div className="cart">
                <span className="cart-icon">
                    <Link to="/checkout"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  {props.cartCount > 0 && <span className="label dataCount">{props.cartCount}</span>}
                  </Link>
    </span>
            </div>
    )
}
export default Cart
