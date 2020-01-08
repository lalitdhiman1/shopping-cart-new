import React from 'react';

export const calculateDiscount = (price, discount) => price - (price * (discount / 100));

const ItemCard = (props) => {
  const { itemDetails, addItem } = props;
  return (
    <div className='item'>
      <img
            className='item-image'
            alt={itemDetails.name}
            src={itemDetails.img_url}
          />

<span className="name">{itemDetails.name}</span>
        <span className="price">&#8377;{calculateDiscount(itemDetails.price, itemDetails.discount)} <span className="discount">{itemDetails.price}</span> <span className="off">{itemDetails.discount}% off</span></span>
        <button className='addtocart-btn' onClick={() => addItem(itemDetails.id)} >
                Add to cart
          </button>
    </div>
  );
};

export default ItemCard;
 
