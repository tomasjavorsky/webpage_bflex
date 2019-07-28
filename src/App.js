import React from 'react';
import './App.css';
import Header         from './Components/Header/Header';
import Footer         from './Components/Footer/Footer';
import Navbar         from './Components/Navbar/Navbar';
import LeftPanel      from './Components/LeftPanel/LeftPanel';
import MainContainer  from './Components/MainContainer/MainContainer';
import {texts, constants} from './strings';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      adminConsoleOpen: false,
      currentTab: "products",
      selectedProductCategory: "",
      selectedProductCategoryData: {
        category_name: texts.newestProducts,
        category_description: ''
      },
      productCategories: [],
      productData: []
    };
    this.adminConsoleClicked        = this.adminConsoleClicked.bind(this);
    this.productsTabClicked         = this.productsTabClicked.bind(this);
    this.contactTabClicked          = this.contactTabClicked.bind(this);
    this.howToOrderTabClicked       = this.howToOrderTabClicked.bind(this);
    this.setSelectedProductCategory = this.setSelectedProductCategory.bind(this);
    this.getProductCategoriesData   = this.getProductCategoriesData.bind(this);
    this.getCurrentCategoryData     = this.getCurrentCategoryData.bind(this);
    this.searchProducts             = this.searchProducts.bind(this);

    //-------DATA FROM DB-------
    this.getProductCategoriesData();
    this.getCurrentCategoryData();
  }
  //-------HELPER FUNCTIONS-------
  getProductCategoriesData(){
    fetch(constants.endpoint + '/productCategories')
      .then(res => res.json())
      .then(res => this.setState({productCategories: res}))
      .catch(err => console.log(err));
  }
  getCurrentCategoryData(currentCategoryName){
    if(currentCategoryName === '' || !currentCategoryName){
      fetch(constants.endpoint+'/products')
        .then(res => res.json())
        .then(res => this.setState({productData: res}))
        .catch(err => console.log(err));
      return {
        category_name: 'Najnovšie produkty',
        category_description: ''
      }
    }else{
      fetch(constants.endpoint+'/products?category='+currentCategoryName)
        .then(res => res.json())
        .then(res => this.setState({productData: res}))
        .catch(err => console.log(err));
      let categoryData = this.state.productCategories.filter(category => category.category_name === currentCategoryName);
      return categoryData[0];
    }
  }
  setSelectedProductCategory(selectedCategoryName){
    this.setState({
      selectedProductCategory: selectedCategoryName,
      selectedProductCategoryData: this.getCurrentCategoryData(selectedCategoryName)
    });
  }

  searchProducts(keyword){
    console.log("searching" + keyword);
    if(keyword && keyword !== ''){
      fetch(constants.endpoint+'/products?searchKeyword='+keyword)
        .then(res => res.json())
        .then(res => this.setState({
          productData: res,
          selectedProductCategoryData: {
            category_name: texts.searchResultFor + keyword,
            category_description: ''
          }
        }))
        .catch(err => console.log(err));
    }
  }

  //-------INPUT-------
  productsTabClicked(){
    this.setState({currentTab: "products",
                        selectedProductCategory: "",
                        selectedProductCategoryData: {
                          category_name: 'Najnovšie produkty',
                          category_description: ''
                        }});
    this.getCurrentCategoryData();
  }
  contactTabClicked(){
    this.setState({currentTab: "contact"});
  }
  howToOrderTabClicked(){
    this.setState({currentTab: "howToOrder"});
  }
  adminConsoleClicked() {
    this.setState({adminConsoleOpen: !this.state.adminConsoleOpen});
  }

  render(){
    return (
      <div className={"app"}>
        <Header />
        <Navbar productsTabClicked={this.productsTabClicked}
                contactTabClicked={this.contactTabClicked}
                howToOrderTabClicked={this.howToOrderTabClicked}
                searchProducts={this.searchProducts}
        />
        <div className={"mainContentContainer"}>
          <div className={"row"}>
            {this.state.currentTab === "products" && <LeftPanel
              adminConsoleOpen={this.state.adminConsoleOpen}
              productCategories={this.state.productCategories}
              setSelectedProductCategory={this.setSelectedProductCategory}
              getProductCategoriesData={this.getProductCategoriesData}
            />}
            <MainContainer
              currentTab={this.state.currentTab}
              productData={this.state.productData}
              selectedProductCategoryData={this.state.selectedProductCategoryData}
              adminConsoleOpen={this.state.adminConsoleOpen}
              getCurrentCategoryData={this.getCurrentCategoryData}
            />
          </div>
        </div>
        <Footer adminConsoleOpen={this.state.adminConsoleOpen}
                adminConsoleClick={this.adminConsoleClicked}
                productCategories={this.state.productCategories}
                getCurrentCategoryData={this.getCurrentCategoryData}
        />
      </div>
    );
  }

}

export default App;
