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
    };

    this.detailsClicked = this.detailsClicked.bind(this);
  }

  ProductTable(props){
    return(
      <div className={"productTableContainer"}>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
        <div className={"tableHideButton"}>
          <button className={"primaryButton"} type={"button"} onClick={props.closeMethod}>Close</button>
        </div>
      </div>
    );
  }

  detailsClicked(){
    this.setState(state => ({tableOpen: !this.state.tableOpen}));
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
              {!this.state.tableOpen && <button className={"primaryButton"} type={"button"} onClick={this.detailsClicked}>Details</button>}
              {this.state.tableOpen && <this.ProductTable closeMethod={this.detailsClicked}/>}
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