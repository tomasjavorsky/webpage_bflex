import React from 'react';
import './Product.css';
import tempImage from './tempImage.jpg';


class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className={"productContainer"}>
          <img className={"productImage"} alt={"product"} src={tempImage}/>
          <div>
            <p className={"productDescription"}>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            <hr/>
            <p className={"productTags"}>Sunt, In, Culpa</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;