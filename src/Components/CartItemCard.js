import React from 'react';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction, deleteItemAction } from '../Actions/listingPageActions';
import { calculateDiscount } from './ItemCard';

const CartItemCard = (props) => {
  const {
    item, addItemMethod, removeItem, deleteItem,
  } = props;
  return (

    <div className="cart__item">
                    
    <div className="cart__image">
    <img
          src={item.img_url}
          alt={item.name}
        />
    </div>
    <div className="cart__desc">
        <span className="name">{item.name}</span>
        <span className="price">
        &#8377;{calculateDiscount(item.price, item.discount)}
          <span className="discount">&#8377;{item.price}</span> 
          <span className="off">{item.discount}% off</span>
        </span>
    </div>
    <div className="cart__control">
    <div
          className='cart-item'
          onClick={item.count === 1
            ? () => deleteItem({ id: item.id })
            : () => removeItem({ id: item.id })
          }
          onKeyPress={item.count === 1
            ? () => deleteItem({ id: item.id })
            : () => removeItem({ id: item.id })
          }
          role='button'
          tabIndex={0}
        >
          -
        </div>
        
          <p className='cart-item-quantity'>{item.count}</p>
        
        <div
          className='cart-item'
          onClick={() => addItemMethod({ id: item.id })}
          onKeyPress={() => addItemMethod({ id: item.id })}
          role='button'
          tabIndex={0}
        >
          +
        </div>
    </div>
    <div className="cart__action">
    <div
          className='cart-item-delete'
          onClick={() => deleteItem({ id: item.id })}
          onKeyPress={() => deleteItem({ id: item.id })}
          role='button'
          tabIndex={0}
        >
          Remove
        </div>
    </div>
    
</div>













    
  );
};

const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
});
const mapDispatchToProps = dispatch => ({
  addItemMethod: props => dispatch(addItemAction(props)),
  removeItem: props => dispatch(removeItemAction(props)),
  deleteItem: props => dispatch(deleteItemAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartItemCard);

 
