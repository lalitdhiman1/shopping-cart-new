import React from 'react'
import { connect } from 'react-redux';
import $ from "jquery";
import { setProductsAction } from '../Actions/listingPageActions';



function RangeSlider(props) {  

    const setRangeSlider = (_min,_max) =>{
        let rangeSliderDiv = document.getElementById("rangeSliderDiv");
        rangeSliderDiv.innerHTML = `<div class="range-slider" id="facet-price-range-slider">
        <p class="price__p">Price</p>
        <input id="minValue" name="range-1" value="0" min="${_min}" max="${_max}" step="1" type="range">
        <input id="maxValue" name="range-2" value="${_max}" min="${_min}" max="${_max}" step="1" type="range">
        
        </div>
        `;
        var rangeSlider = document.querySelector('#facet-price-range-slider');
        if(rangeSlider.length > 0) {
        rangeSlider.RangeSlider({
        output: {
            format: function(output){
            return output.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            },
            suffix: function(input){
            return parseInt($(input).val()) === parseInt($(input).attr('max')) ? this.config.maxSymbol : '';
            }
        }
        });
        }
        }
     React.useEffect(()=>{
         if(props.minVal!==0 && props.maxVal!==0){
            setRangeSlider(props.minVal, props.maxVal)
         }
         
     },[props])   


     const onApplyClick =()=>{
        const minVal = document.querySelector("#minValue").value; 
        const mxnVal = document.querySelector("#maxValue").value;
        let filterdata = props.productList.filter(_data =>  _data.price >= minVal);
            filterdata = filterdata.filter(_data =>  _data.price <= mxnVal); 
            props.handleRangeSlider(filterdata);
     }
     const onApplyClickMobile =()=>{
        const minVal = document.querySelector("#minValue").value; 
        const mxnVal = document.querySelector("#maxValue").value;
        let filterdata = props.productList.filter(_data =>  _data.price >= minVal);
            filterdata = filterdata.filter(_data =>  _data.price <= mxnVal); 
            props.handleRangeSlider(filterdata);
            props.mobileCloseLeftPanel()
     }
    return (
            <React.Fragment>
                <div id="rangeSliderDiv"></div>
                
                <button onClick={()=>props.mobileCloseLeftPanel()} className="cancel__button">Cancel</button>
                <button onClick={()=>onApplyClickMobile()} className="apply__button mobile">Apply</button>
                <button onClick={()=>onApplyClick()} className="apply__button desktop">Apply</button>
            </React.Fragment>

    )
}


const mapStateToProps = state => ({
    productList: state.listingReducer.productList
  });
  
  const mapDispatchToProps = dispatch => ({
    setProductList: props => dispatch(setProductsAction(props))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(RangeSlider);
  