import React from 'react';
import './MainContainer.css';
import Product from '../Product/Product';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "products"
    }
  }

  ProductsTab(props){

    function productGenerator(productData) {
      return productData.map((currentProduct, index) => <Product
        key={index+currentProduct.name}
        name={currentProduct.name}
        description={currentProduct.description}
        tags={currentProduct.tags}
        tabColumns={currentProduct.tabColumns}
        tabRows={currentProduct.tabRows}
      /> )
    }

    return(
      <div className={"productTab"}>
        <h2>TITLE HEADING</h2>
        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco.</p>
        {productGenerator(props.productData)}
      </div>
    );
  }

  ContactTab(props){
    return(
      <div className={"contactTab"}>
        <h2>KONTAKT</h2>
        <div className={"contactTabInfo"}>
          <h4>Bflex, s.r.o.</h4>
          <p>Ľ. Fullu 7, 841 05 Bratislava</p>
          <p>tel.: +421 2 20721062</p>
          <p>fax.: +421 2 20730795</p>
          <p>mob.: +421 917 701028</p>
          <p>e-mail: info@bflex.sk</p>
        </div>
      </div>
    );
  }

  HowToOrder(props){
    return(
      <div className={"contactTab"}>
        <h2>AKO OBJEDNAŤ</h2>
        <div className={"contactTabInfo howToTab"}>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco.</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={'main'}>
        {this.props.currentTab === "products" && <this.ProductsTab productData={this.props.productData}/>}
        {this.props.currentTab === "contact" && <this.ContactTab/>}
        {this.props.currentTab === "howToOrder" && <this.HowToOrder/>}
      </div>
    );
  }
}

export default MainContainer;