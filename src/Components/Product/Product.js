import React from 'react';
import './Product.css';
import tempImage from './tempImage.jpg';


class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productData:{
        name: "Deserunt mollit",
        description: "Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        altName: "Sunt, In, Culpa",
        image: tempImage
      },
      tableOpen: false
    }
  }

  render() {
    return (
      <div>
        <div className={"productContainer"}>
          <img className={"productImage"} alt={"product"} src={this.state.productData.image}/>
          <div>
            <h4>{this.state.productData.name}</h4>
            <p className={"productDescription"}>{this.state.productData.description}</p>
            <div className={"productTable"}>
              <button className={"productDetailsButton"} type={"button"}>Detaily</button>
            </div>
            <hr/>
            <p className={"productAlt"}>{this.state.productData.altName}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;