import React from 'react';
import './CartPanel.css';
import {texts} from "../../strings";

class CartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productsInCart: [
        {
          productID: "1",
          productName: "P1",
          productImageLink: "https://firebasestorage.googleapis.com/v0/b/bflex-imgdb.appspot.com/o/product_images%2Fsyar-elf-archer.jpg?alt=media&token=95b72a46-2965-477b-b858-337d020a25f4"
        },
        {
          productID: "2",
          productName: "P2",
          productImageLink: "https://firebasestorage.googleapis.com/v0/b/bflex-imgdb.appspot.com/o/product_images%2Fpark-junkyu-3.jpg?alt=media&token=e926e6c8-b05e-4218-98f9-33ad47cb4cfc"
        },
        {
          productID: "4",
          productName: "P3",
          productImageLink: "https://firebasestorage.googleapis.com/v0/b/bflex-imgdb.appspot.com/o/product_images%2FLlama_lying_down.jpg?alt=media&token=b4e3fba3-825d-4739-b72d-5557a8f5df19"
        },
      ]

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
    return this.state.productsInCart.map((currentProductThumbnail) => <this.ProductThumbnail
      productID = {currentProductThumbnail.productID}
      productName = {currentProductThumbnail.productName}
      productImageLink = {currentProductThumbnail.productImageLink}
    />)
  }


  render() {
    return (
      <div className={"cartPanelContainer"}>
        <div className={"cartPanelOrderedProducts"}>
          {this.productThumbnailGenerator(this.state.productsInCart)}
        </div>
        <button className={"primaryButton"} type={"button"}>{texts.order}</button>
      </div>
    )
  }
}

export default CartPanel;