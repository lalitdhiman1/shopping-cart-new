import React from 'react'
import Search from './Search';
import Cart from './Cart';
import { connect } from 'react-redux';
import { setProductsAction, addItemAction } from '../Actions/listingPageActions';


function Header(props) {
    
    return (
        <header className="header">
        <span className="header__star"><i className="fa fa-star" aria-hidden="true"></i></span>
        <Search handleSearch={props.handleSearch} />
        <Cart cartCount={props.cartCount} />
        </header>
    )
}

const mapStateToProps = state => ({
    productList: state.listingReducer.productList,
    cartList: state.listingReducer.cartList,
    cartCount: state.listingReducer.cartCount
  });
  
  const mapDispatchToProps = dispatch => ({
    setProductList: props => dispatch(setProductsAction(props)),
    addItemMethod: props => dispatch(addItemAction(props))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
  