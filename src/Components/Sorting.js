import React from 'react'
import { connect } from 'react-redux';
import { setProductsAction, addItemAction, sortingDesc } from '../Actions/listingPageActions';

function Sorting(props) {
   const compare = (_arguments) => {
        return ( a, b ) => {
          if ( a[_arguments] < b[_arguments] ){
            return -1;
          }
          if ( a[_arguments] > b[_arguments] ){
            return 1;
          }
          return 0;
        }
      }
    
      const sorting = (_filter)=>{
        if(_filter==="desc"){
          props.productList.sort(compare('price')).reverse();
          document.querySelector('.price__highlow').classList.add("select")       
          document.querySelector('.price__lowhigh').classList.remove("select")       
          document.querySelector('.price__discount').classList.remove("select")       
        }else if(_filter==="asc"){
          props.productList.sort(compare('price'))
          document.querySelector('.price__highlow').classList.remove("select")       
          document.querySelector('.price__lowhigh').classList.add("select")       
          document.querySelector('.price__discount').classList.remove("select")       
        }else if(_filter==="discount"){
          props.productList.sort(compare('discount')).reverse()  
          document.querySelector('.price__highlow').classList.remove("select")       
          document.querySelector('.price__lowhigh').classList.remove("select")       
          document.querySelector('.price__discount').classList.add("select")     
        }
        props.handleClick(props.productList)
        // props.renderItemCard(props.productList)
      }

      const mobileApply = () =>{
        var ele = document.getElementsByName('sorting'); 
        var _sort=""      
        for(let i = 0; i < ele.length; i++) { 
            if(ele[i].checked){
              _sort = ele[i].value
            } 
        } 

        console.log(_sort)
        sorting(_sort)
        props.mobileCloseSorting()
      }
      
    return (
      <React.Fragment>
        <div className="sort_by">
                    <h2>Sort by</h2>
                    <span onClick={()=>sorting("desc")} className="price__highlow">Price -- High Low</span>
                    <span onClick={()=>sorting("asc")} className="price__lowhigh">Price -- Low High</span>
                    <span onClick={()=>sorting("discount")} className="price__discount">Discount</span>
                    
        </div>
        <div className="sort_by mobile mainMobileSort">
                    <h2>Sort by</h2>
                    <div className="sorting"><input type="radio" name="sorting" id="input1" value="desc"></input><label for="input1">Price -- High Low</label></div>
                    <div className="sorting"><input type="radio" name="sorting" id="input2" value="asc"></input><label for="input2">Price -- Low High</label></div>
                    <div className="sorting"><input type="radio" name="sorting" id="input3" value="discount"></input><label for="input3">Price -- Discount</label></div>

                  <button onClick={()=>props.mobileCloseSorting()} className="cancel__button">Cancel</button>
                  <button onClick={()=>mobileApply()} className="apply__button">Apply</button>
                    
        </div>
        <div className="showMobilePanel">
          <div className="sort"><span onClick={()=>props.sortingDiv()}>Sort<i className="fa fa-sort" aria-hidden="true"></i></span></div>
          <div className="filter"><span onClick={()=>props.filteringDiv()}><i className="fa fa-filter" aria-hidden="true"></i>Filter</span></div>
        </div>
      </React.Fragment>
    )
}

const mapStateToProps = state => ({
    productList: state.listingReducer.productList,
    cartList: state.listingReducer.cartList,
    cartCount: state.listingReducer.cartCount
  });
  
  const mapDispatchToProps = dispatch => ({
    setProductList: props => dispatch(setProductsAction(props)),
    addItemMethod: props => dispatch(addItemAction(props)),
    sortingMethod: props => dispatch(sortingDesc(props))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
  