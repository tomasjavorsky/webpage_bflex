import React from 'react';
import Parser from 'html-react-parser';
import './Product.css';
import {constants, texts} from '../../strings';

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
      </div>
    );
  }

  detailsClicked(){
    this.setState({tableOpen: !this.state.tableOpen});
  }
  deleteClicked(props){
    fetch(constants.endpoint + '/products',
      {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            product_id: props.id}
          )
      })
      .then(res => {console.log("deleting");props.getCurrentCategoryData()})
  }

  render() {
    return (
      <div>
        <div className={"productContainer"}>
          <img className={"productImage"} alt={"product"} src={this.props.imageLink}/>
          <div className={"productInfo"}>
            {this.props.adminConsoleOpen && <button className={"primaryButton deleteButton"}
                             type={"button"}
                             onClick={() => {this.deleteClicked(this.props)}}>
              {texts.delete}</button>}
            <h4>{this.props.name}</h4>
            <p className={"productDescription"}>{this.props.description}</p>
            <div className={"productButtons"}>
              {(!this.state.tableOpen && this.props.tabRows !== "") && <button
                      className={"secondaryButton"}
                      type={"button"}
                      onClick={this.detailsClicked}
              >{texts.details}</button>}
              {this.state.tableOpen && <button
                      className={"secondaryButton"}
                      type={"button"}
                      onClick={this.detailsClicked}
              >{texts.close}</button>}
              <button className={"primaryButton addToCartButton"}
                      type={"button"}
                      onClick={() => {this.props.addProductToCart({
                        productID: this.props.id,
                        productName: this.props.name,
                        productImageLink: this.props.imageLink
                      })}}
              >{texts.addToCart}</button>
            </div>
            {this.props.tabRows !== "" && <div className={"productTable"}>
              {this.state.tableOpen && <this.ProductTable
                tabColumns={this.props.tabColumns}
                tabRows={this.props.tabRows}
              />}
            </div>}
            <hr/>
            <p className={"productAlt"}>{this.props.tags}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;