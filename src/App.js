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
      productCategories: ["Lešenie","Distančné prvky","Armovanie","Bednenie","Tesniace prvky","Akustická izolácia"]
    };
    this.adminConsoleClicked = this.adminConsoleClicked.bind(this);
  }

  adminConsoleClicked() {
    this.setState({adminConsoleOpen: !this.state.adminConsoleOpen});
  }

  addProductCategory(categoryName){
    this.setState({productCategories: [this.state.productCategories, {categoryName}]})
  }

  render(){
    return (
      <div className={"app"}>
        <Header />
        <Navbar />
        <div className={"row"}>
          <LeftPanel
            adminConsoleOpen={this.state.adminConsoleOpen}
            categories={this.state.productCategories}
            addCategory={this.addProductCategory}
          />
          <MainContainer />
        </div>
        <Footer adminConsoleOpen={this.state.adminConsoleOpen} adminConsoleClick={this.adminConsoleClicked} />
      </div>
    );
}

}

export default App;
