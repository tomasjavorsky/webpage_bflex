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
        <div className={"tableHideButton"}>
          <button className={"primaryButton"}
                  type={"button"}
                  onClick={props.closeMethod}
          >{texts.close}</button>
        </div>
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

            {this.props.tabRows !== "" && <div className={"productTable"}>
              {!this.state.tableOpen && <button className={"primaryButton"}
                                                type={"button"}
                                                onClick={this.detailsClicked}
              >{texts.details}</button>}
              {this.state.tableOpen && <this.ProductTable
                closeMethod={this.detailsClicked}
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