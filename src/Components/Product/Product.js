import React from 'react';
import Parser from 'html-react-parser';
import './Product.css';
import tempImage from './tempImage.jpg';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productData:{
        name: "Deserunt mollit",
        description: "Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        tags: "Sunt, In, Culpa",
        image: tempImage,
        tabColumns: "Name,Age,Occupation",
        tabRows: "John,18,Student," +
          "Miranda,23,Nurse," +
          "Ashley,32,Telephonist," +
          "Rose,28,Driver"
      },
      tableOpen: false
    };

    this.detailsClicked = this.detailsClicked.bind(this);
  }

  ProductTable(props){

    let numberOfColumns = props.tabColumns.split(",").length;
    let tableData = props.tabRows.split(",");

    function generateRows(){
      let r = ``;
      for (let i=0; i<tableData.length/numberOfColumns; i++){
        r =`${r}<tr>`;
        for(let j=0; j<numberOfColumns; j++){
          r = `${r}<td>${tableData[i*numberOfColumns+j]}</td>`;
        }
        r =`${r}</tr>`;
      }
      return Parser(r);
    }
    
    return(
      <div className={"productTableContainer"}>
        <table>
          <tbody>
            <tr>
              {props.tabColumns.split(",").map((column, index) => <th key={"column"+index}>{column}</th>)}
            </tr>
            {generateRows()}
          </tbody>
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
              {this.state.tableOpen && <this.ProductTable
                closeMethod={this.detailsClicked}
                tabColumns={this.state.productData.tabColumns}
                tabRows={this.state.productData.tabRows}
              />}
            </div>
            <hr/>
            <p className={"productAlt"}>{this.state.productData.tags}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;