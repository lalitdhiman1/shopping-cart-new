import React from 'react';

const PriceBar = (props) => {
  const {
    price, discount, cartCount,
  } = props;
  return (
<React.Fragment>
    <div className="priceBox">
    <div className="originalPrice cartpageDiv">
        <span className="priceItems">Price({cartCount} {(cartCount>1?"Items":"Item")})</span>
        <span className="columns">:</span>
        <span className="price">&#8377;{price}</span>
    </div>
    <div className="discountPrice cartpageDiv">
        <span className="priceItems">Discount</span>
        <span className="columns">:</span>
        <span className="price">&#8377;{discount}</span>
    </div>
</div>
<div className="totalPayable">
    <span className="priceItems">Total Payable</span>
    <span className="columns"></span>
    <span className="price">&#8377;{price - discount}</span>
</div>


</React.Fragment>


  );
};
export default PriceBar;
