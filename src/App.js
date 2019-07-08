import React from 'react';
import './App.css';
import Header         from './Components/Header/Header';
import Footer         from './Components/Footer/Footer';
import Navbar         from './Components/Navbar/Navbar';
import LeftPanel      from './Components/LeftPanel/LeftPanel';
import MainContainer  from './Components/MainContainer/MainContainer';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      adminConsoleOpen: false,
      currentTab: "products",
      productCategories: ["Lešenie","Distančné prvky","Armovanie","Bednenie","Tesniace prvky","Akustická izolácia"]
    };
    this.adminConsoleClicked = this.adminConsoleClicked.bind(this);
    this.addProductCategory = this.addProductCategory.bind(this);
    this.productsTabClicked = this.productsTabClicked.bind(this);
    this.contactTabClicked = this.contactTabClicked.bind(this);
    this.howToOrderTabClicked = this.howToOrderTabClicked.bind(this);
  }

  productsTabClicked(){
    this.setState({currentTab: "products"});
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

  addProductCategory(categoryName){
    if(categoryName !== ""){
      let currentCategories = this.state.productCategories;
      this.setState({productCategories: [...currentCategories, categoryName]})
    }
  }

  render(){
    return (
      <div className={"app"}>
        <Header />
        <Navbar productsTabClicked={this.productsTabClicked}
                contactTabClicked={this.contactTabClicked}
                howToOrderTabClicked={this.howToOrderTabClicked}/>
        <div className={"mainContentContainer"}>
          <div className={"row"}>
            {this.state.currentTab === "products" && <LeftPanel
              adminConsoleOpen={this.state.adminConsoleOpen}
              categories={this.state.productCategories}
              addCategory={this.addProductCategory}
            />}
            <MainContainer currentTab={this.state.currentTab}/>
          </div>
        </div>
        <Footer adminConsoleOpen={this.state.adminConsoleOpen}
                adminConsoleClick={this.adminConsoleClicked}
                productCategories={this.state.productCategories} />
      </div>
    );
  }

}

export default App;
