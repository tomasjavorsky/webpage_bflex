import React from 'react';
import './ProductThumbnail.css'

class ProductThumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageLink: "",
    }
  }

  render() {
    return (
      <div className={"productThumbnailContainer"}>
        <img className={"productThumbImage"} alt={"product"} src={"https://firebasestorage.googleapis.com/v0/b/bflex-imgdb.appspot.com/o/product_images%2Fsym.jpg?alt=media&token=b33823a1-e95e-4bfb-aea8-40fd7895048d"}/>
        <p className={"productThumbName"}>Product NameProduct Name</p>
      </div>
    )
  }
}

export default ProductThumbnail;