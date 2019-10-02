import React from 'react';
import './App.css';
import Header             from './Components/Header/Header';
import Footer             from './Components/Footer/Footer';
import Navbar             from './Components/Navbar/Navbar';
import LeftPanel          from './Components/LeftPanel/LeftPanel';
import CartPanel          from './Components/CartPanel/CartPanel';
import MainContainer      from './Components/MainContainer/MainContainer';
import {texts, constants} from './strings';
import LandingPage        from "./Components/LandingPage/LandingPage";

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      adminConsoleOpen: false,
      cartOpen: true,
      landingPageOpen: true,
      currentTab: "products",
      selectedProductCategory: "",
      selectedProductCategoryData: {
        category_name: texts.newestProducts,
        category_description: ''
      },
      productCategories: [],
      productData: [],
      productsInCart: [],
      categoryImages: [],
    };

    this.adminConsoleClicked        = this.adminConsoleClicked.bind(this);
    this.productsTabClicked         = this.productsTabClicked.bind(this);
    this.contactTabClicked          = this.contactTabClicked.bind(this);
    this.howToOrderTabClicked       = this.howToOrderTabClicked.bind(this);
    this.downloadsTabClicked        = this.downloadsTabClicked.bind(this);
    this.jobsTabClicked             = this.jobsTabClicked.bind(this);

    this.landingProductsTabClicked  = this.landingProductsTabClicked.bind(this);
    this.landingContactTabClicked   = this.landingContactTabClicked.bind(this);
    this.landingDownloadsTabClicked = this.landingDownloadsTabClicked.bind(this);
    this.landingJobsTabClicked      = this.landingJobsTabClicked.bind(this);
    this.landingSetSelectedProductCategory = this.landingSetSelectedProductCategory.bind(this);

    this.setSelectedProductCategory = this.setSelectedProductCategory.bind(this);
    this.getProductCategoriesData   = this.getProductCategoriesData.bind(this);
    this.getCurrentCategoryData     = this.getCurrentCategoryData.bind(this);
    this.searchProducts             = this.searchProducts.bind(this);
    this.addProductToCart           = this.addProductToCart.bind(this);
    this.removeProductFromCart      = this.removeProductFromCart.bind(this);
    this.getCategoryImagesData      = this.getCategoryImagesData.bind(this);

    //-------DATA FROM DB-------
    this.getProductCategoriesData();
    this.getCurrentCategoryData();
    this.getCategoryImagesData();
  }

  //-------HELPER FUNCTIONS-------
  getProductCategoriesData(){
    fetch(constants.endpoint + '/productCategories')
      .then(res => res.json())
      .then(res => this.setState({productCategories: res}))
      .catch(err => console.log(err));
  }
  getCategoryImagesData(){
    fetch(constants.endpoint + '/categoryImages')
      .then(res => res.json())
      .then(res => this.setState({categoryImages: res.rows}))
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
  landingSetSelectedProductCategory(selectedCategoryName){
    this.setState({
      landingPageOpen: false,

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
  addProductToCart(product){
    let isAlreadyPresent = false;
    this.state.productsInCart.forEach((p) => {
      if(p.productID === product.productID){
        isAlreadyPresent = true;
      }
    });
    if(!isAlreadyPresent){
      this.setState({productsInCart: [...this.state.productsInCart, product]});
    }
  }
  removeProductFromCart(productId){
    this.setState(prevState => {
      let temp = this.state.productsInCart.filter(value => value.productID !== productId);
      return {productsInCart: temp};
    })
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
  downloadsTabClicked(){
    this.setState({currentTab: "downloads"});
  }
  jobsTabClicked(){
    this.setState({currentTab: "jobs"});
  }

  landingProductsTabClicked(){
    this.setState({currentTab: "products",
      selectedProductCategory: "",
      landingPageOpen: false,
      selectedProductCategoryData: {
        category_name: 'Najnovšie produkty',
        category_description: ''
      }});
    this.getCurrentCategoryData();
  }
  landingContactTabClicked(){
    this.setState({currentTab: "contact",
      landingPageOpen: false,});
  }
  landingDownloadsTabClicked(){
    this.setState({currentTab: "downloads",
      landingPageOpen: false,});
  }
  landingJobsTabClicked(){
    this.setState({currentTab: "jobs",
      landingPageOpen: false,});
  }


  adminConsoleClicked() {
    this.setState({adminConsoleOpen: !this.state.adminConsoleOpen});
  }

  render(){
    return (
      <div className={"app"}>
        {/*Landing Page*/}
        {this.state.landingPageOpen && <LandingPage
          categoryImages={this.state.categoryImages}
          landingProductsTabClicked={this.landingProductsTabClicked}
          landingContactTabClicked={this.landingContactTabClicked}
          landingDownloadsTabClicked={this.landingDownloadsTabClicked}
          landingJobsTabClicked={this.landingJobsTabClicked}
          landingSetSelectedProductCategory={this.landingSetSelectedProductCategory}
          />}
        {/*Website*/}
        {!this.state.landingPageOpen &&
        <div>
          <button className={"secondaryButton floatButton"} onClick={() => {
            window.scrollTo(0, 0)
          }}>{texts.orderUP}</button>
          <Header id={"navbarLocation"}/>
          <Navbar
                  productsTabClicked={this.productsTabClicked}
                  contactTabClicked={this.contactTabClicked}
                  howToOrderTabClicked={this.howToOrderTabClicked}
                  downloadsTabClicked={this.downloadsTabClicked}
                  jobsTabClicked={this.jobsTabClicked}
                  searchProducts={this.searchProducts}
          />
          {this.state.productsInCart.length !== 0 && <CartPanel
            productsInCart={this.state.productsInCart}
            removeProductFromCart={this.removeProductFromCart}
          />}
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
                getCurrentCategoryData={() => {this.getCurrentCategoryData(this.state.selectedProductCategory)}}
                addProductToCart={this.addProductToCart}
              />
            </div>
          </div>
          <Footer
            adminConsoleOpen={this.state.adminConsoleOpen}
                  adminConsoleClick={this.adminConsoleClicked}
                  productCategories={this.state.productCategories}
                  getCurrentCategoryData={this.getCurrentCategoryData}
          />
        </div>}
      </div>
    );
  }
}

export default App;
