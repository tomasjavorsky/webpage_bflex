import React from 'react';
import Parser from 'html-react-parser';
import './Product.css';
import tempImage from './tempImage.jpg';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableOpen: false
    };

    this.detailsClicked = this.detailsClicked.bind(this);
  }

  ProductTable(props){

    function generateRows(){
      let numberOfColumns = props.tabColumns.split(",").length;
      let tableData = props.tabRows.split(",");
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
          <button className={"primaryButton"}
                  type={"button"}
                  onClick={props.closeMethod}
          >Close</button>
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
          <img className={"productImage"} alt={"product"} src={tempImage}/>
          <div>
            <h4>{this.props.name}</h4>
            <p className={"productDescription"}>{this.props.description}</p>
            <div className={"productTable"}>
              {!this.state.tableOpen && <button className={"primaryButton"} type={"button"} onClick={this.detailsClicked}>Details</button>}
              {this.state.tableOpen && <this.ProductTable
                closeMethod={this.detailsClicked}
                tabColumns={this.props.tabColumns}
                tabRows={this.props.tabRows}
              />}
            </div>
            <hr/>
            <p className={"productAlt"}>{this.props.tags}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;