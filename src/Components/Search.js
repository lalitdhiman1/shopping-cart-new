import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setProductsAction } from '../Actions/listingPageActions';

function Search(props) {
    const [inpVal, setInpVal] = useState("");

  

      const searchingFor = (term) => {
        return function(x) {
          return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
        };
      }
      const listData = props.productList;
      const searchVal = (e) => {
          e.preventDefault();
          
          let _val = e.target.value
          setInpVal(e.target.value)
          const searchData = listData.filter(searchingFor(_val)).map(item=>item)
          props.handleSearch(searchData);
        }
     
    return (
        <div className="header__search">
                <form id="header__searchForm" >
                <i className="fa fa-search" aria-hidden="true"></i>
                <input onChange={(e) => searchVal(e)} value={inpVal} type="text" name="search" id="search" />
            </form>
            </div>
    )
}

const mapStateToProps = state => ({
    productList: state.listingReducer.productList
  });
  
  const mapDispatchToProps = dispatch => ({
    setProductList: props => dispatch(setProductsAction(props))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Search);
  