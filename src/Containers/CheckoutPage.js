import React from 'react';
import { connect } from 'react-redux';
import CartItemCard from '../Components/CartItemCard';
import PriceBar from '../Components/PriceBar';

const renderCartItems = (details) => {
  const cartItems = details.map(item => (
    <CartItemCard key={item.id} item={item} />
  ));
  return cartItems;
};

const renderPriceBar = (price, discount, typeDiscount, cartCount) => (<PriceBar
  price={price}
  discount={discount}
  typeDiscount={typeDiscount}
  cartCount={cartCount}
/>);

const priceCalculate = (itemDetails, cartCount) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalTypeDiscount = 0;
  itemDetails.map((item) => { // eslint-disable-line
    totalPrice += item.price * item.count;
    totalDiscount += item.price * (item.discount / 100) * item.count;
    totalTypeDiscount += (item.type === 'fiction') ? (item.price * 0.15) * item.count : 0;
  });
  return renderPriceBar(totalPrice, totalDiscount, totalTypeDiscount, cartCount);
};

const goBack = (props) => {
  props.router.push('/home');
};

const CheckoutPage = (props) => {
  const { cartCount } = props;
  if (cartCount <= 0) {
    goBack(props);
  }
  const cartDetails = Object.keys(props.cartList).map(key => props.cartList[key]);
  return (
    <div className="wrapper">
        <header className="header">
        <span className="header__star"><i className="fa fa-star" aria-hidden="true"></i></span>
            <div className="header__search">
                <form id="searchForm" >
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" name="search" id="search" />
            </form>
            </div>
            
        </header>
        
        <section className="container">
        <div className="cart___leftpanel">
           {renderCartItems(cartDetails)}
        </div>
      
            <div className="cart___rightpanel">
                <div className="rightPanel__box">
                    <h2>Price details</h2>
        {priceCalculate(cartDetails, cartCount)}
      </div>
    </div>
    </section></div>
  );
};
const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
  cartCount: state.listingReducer.cartCount,
});

export default connect(mapStateToProps)(CheckoutPage);
 