import React from 'react';
import './MainContainer.css';
import Product from '../Product/Product';
import {texts} from '../../strings';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "products"
    }
  }

  ProductsTab(props){

    function productGenerator(productData) {
      return productData.map((currentProduct) => <Product
        key={"productKey"+currentProduct.product_id}
        id={currentProduct.product_id}
        name={currentProduct.product_name}
        imageLink={currentProduct.product_image}
        description={currentProduct.product_description}
        tags={currentProduct.product_tags}
        tabColumns={currentProduct.product_columns}
        tabRows={currentProduct.product_rows}
        adminConsoleOpen={props.adminConsoleOpen}
      /> )
    }

    return(
      <div className={"productTab"}>
        <h2>{props.selectedProductCategoryData.category_name}</h2>
        <p>{props.selectedProductCategoryData.category_description}</p>
        {productGenerator(props.productData)}
      </div>
    );
  }

  ContactTab(props){
    return(
      <div className={"contactTab"}>
        <h2>{texts.contact}</h2>
        <div className={"contactTabInfo"}>
          <h4>{texts.companyName}</h4>
          {texts.companyContactInfo}
        </div>
      </div>
    );
  }

  HowToOrder(props){
    return(
      <div className={"contactTab"}>
        <h2>{texts.howToOrder}</h2>
        <div className={"contactTabInfo howToTab"}>
          <p>{texts.howToOrderDescription}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={'main'}>
        {this.props.currentTab === "products" && <this.ProductsTab
          productData={this.props.productData}
          selectedProductCategoryData={this.props.selectedProductCategoryData}
          adminConsoleOpen={this.props.adminConsoleOpen}/>}
        {this.props.currentTab === "contact" && <this.ContactTab/>}
        {this.props.currentTab === "howToOrder" && <this.HowToOrder/>}
      </div>
    );
  }
}

export default MainContainer;