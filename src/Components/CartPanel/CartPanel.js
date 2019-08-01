import React from 'react';
import './CartPanel.css';
import ProductThumbnail from '../ProductThumbnail/ProductThumbnail';
import {texts} from "../../strings";

class CartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className={"cartPanelContainer"}>
        <div className={"cartPanelOrderedProducts"}>
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
          <ProductThumbnail />
        </div>
        <button className={"primaryButton"} type={"button"}>{texts.order}</button>
      </div>
    )
  }
}

export default CartPanel;