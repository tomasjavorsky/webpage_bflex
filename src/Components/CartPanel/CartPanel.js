import React from 'react';
import './CartPanel.css';
import {texts} from "../../strings";

class CartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  ProductThumbnail(props){
      return (
        <div className={"productThumbnailContainer"}>
          <img className={"productThumbImage"} alt={"product"} src={props.productImageLink}/>
          <p className={"productThumbName"}>{props.productName}</p>
        </div>
      )
  }

  productThumbnailGenerator(productThumbnailData){
    return productThumbnailData.map((currentProductThumbnail) => <this.ProductThumbnail
      key={"productThumbKey"+currentProductThumbnail.productID}
      productID = {currentProductThumbnail.productID}
      productName = {currentProductThumbnail.productName}
      productImageLink = {currentProductThumbnail.productImageLink}
    />)
  }


  render() {
    return (
      <div className={"cartPanelContainer"}>
        <div className={"cartPanelOrderedProducts"}>
          {this.productThumbnailGenerator(this.props.productsInCart)}
        </div>
        <button className={"primaryButton"} type={"button"}>{texts.order}</button>
      </div>
    )
  }
}

export default CartPanel;