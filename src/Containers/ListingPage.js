import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProductsAction, addItemAction } from '../Actions/listingPageActions';
import ItemCard from '../Components/ItemCard';
import Sorting from '../Components/Sorting';
import ListItem from '../Components/ListItem';
import RangeSlider from '../Components/RangeSlider';
import Header from '../Components/Header';



class ListingPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      pageItem:[],
      minVal:0,
      maxVal:0
    }
    const { setProductList } = props;
    fetch("https://api.myjson.com/bins/qzuzi")
    .then(res => res.json())
    .then(data => {
        data.map(item => {
            return item.discountPrice = item.price - ((item.price * item.discount) / 100)
        })
        const minCount=Math.min.apply(Math, data.map(function(o) { return o.price; }));
        const maxCount=Math.max.apply(Math, data.map(function(o) { return o.price; }));
        
      
        this.setState({
      minVal:minCount,
      maxVal:maxCount
    })
        setProductList({ productList: data });
    })    
    this.renderItemCard =this.renderItemCard.bind()
  }
   
  

  addItem = (id) => {
    const {addItemMethod} = this.props;
    addItemMethod({ id });
  }  

  mobileCloseLeftPanel =() =>{
    document.querySelector(".leftPanel").style.display="none"
    document.querySelector(".black-overlay").style.display="none"
  }
  mobileCloseSorting =() =>{
    document.querySelector(".mainMobileSort").style.display="none"
    document.querySelector(".black-overlay").style.display="none"
  }

  sortingDiv =() => {
    document.querySelector(".mainMobileSort").style.display="block"
    document.querySelector(".black-overlay").style.display="block"
  }
  filteringDiv =() => {
    document.querySelector(".leftPanel").style.display="block"
    document.querySelector(".black-overlay").style.display="block"
  }

  renderItemCard = (productList) => {
    
    
    if (productList.length > 0) {
      const itemCards = productList.map(i => (
        <ItemCard key={i.id} itemDetails={i} addItem={this.addItem} />
      ));
      return this.setState({pageItem:itemCards})  
    } 
    return <div className='text-center'> No results found </div>;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.productList!==nextProps.productList){
      this.renderItemCard(this.props.productList)
    }
    
  }
 
  render() {
    const { props, renderItemCard } = this;
    const { productList, cartCount} = props;
    return (
      <div className="wrapper">
        <div className="black-overlay"></div>

       <Header  handleSearch={this.renderItemCard} cartCount={cartCount} />
        
        <section className="container">
            <div className="leftPanel">
            <h3>Filters</h3>
            <RangeSlider  mobileCloseLeftPanel={this.mobileCloseLeftPanel} handleRangeSlider={this.renderItemCard} minVal={this.state.minVal} maxVal={this.state.maxVal} />
                
            </div>
            <div className="rightPanel">
               <Sorting filteringDiv={this.filteringDiv} sortingDiv={this.sortingDiv} mobileCloseSorting={this.mobileCloseSorting} handleClick={this.renderItemCard} />
               <ListItem itemContainer={this.state.pageItem} />
            </div>

        </section>
      </div>
    );
  }
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


export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
