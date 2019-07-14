import React from 'react';
import './App.css';
import Header         from './Components/Header/Header';
import Footer         from './Components/Footer/Footer';
import Navbar         from './Components/Navbar/Navbar';
import LeftPanel      from './Components/LeftPanel/LeftPanel';
import MainContainer  from './Components/MainContainer/MainContainer';
import tempImage from "./Components/Product/tempImage.jpg";

const endpoint = 'http://127.0.0.1:3001';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      adminConsoleOpen: false,
      currentTab: "products",
      productCategories: [
        {
          categoryName: "Lesenie",
          categoryDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          categoryName: "Debnenie",
          categoryDescription: "Dorem gypsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          categoryName: "Zelezne tyce",
          categoryDescription: "Morem hipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          categoryName: "Izolacie",
          categoryDescription: "Orem lipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          categoryName: "Stavebna chemia",
          categoryDescription: "Worem ripsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      ],
      productData:[
        {
          name: "Omnis voluptas",
          description: "Minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut au",
          tags: "Sunt, In, Culpa",
          image: tempImage,
          tabColumns: "Name,Age,Occupation",
          tabRows: "Ayyman,18,Loler," +
            "Gigatron,23,Astroboy," +
            "Ashley,32,Telephonist," +
            "Rose,28,Driver"
        },
        {
          name: "Meleniti atque",
          description: "sthrtthrthrhrh",
          tags: "Sunt, In, Culpa",
          image: tempImage,
          tabColumns: "Name,Age,Occupation",
          tabRows: "John,18,Student," +
            "Miranda,23,Nurse," +
            "Ashley,32,Telephonist," +
            "Rose,28,Driver"
        },
        {
          name: "Deserunt mollit",
          description: "Yr lo-fi next level, edison bulb vexillologist la croix bicycle rights cliche dreamcatcher everyday carry adaptogen master cleanse kombucha. Asymmetrical ramps pabst celiac banjo, four loko tumeric stumptown la croix freegan VHS sartorial meditation food truck.",
          tags: "Sunt, In, Culpa",
          image: tempImage,
          tabColumns: "Name,Age,Occupation",
          tabRows: "John,18,Student," +
            "Miranda,23,Nurse," +
            "Ashley,32,Telephonist," +
            "Rose,28,Driver"
        }
      ]
    };
    this.adminConsoleClicked = this.adminConsoleClicked.bind(this);
    this.addProductCategory = this.addProductCategory.bind(this);
    this.productsTabClicked = this.productsTabClicked.bind(this);
    this.contactTabClicked = this.contactTabClicked.bind(this);
    this.howToOrderTabClicked = this.howToOrderTabClicked.bind(this);
  }

  testFetch(){
    fetch(endpoint + '/productCategories')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
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

  addProductCategory(newCategory){
    console.log(newCategory.categoryName);
    if(newCategory.categoryName !== ""){
      let currentCategories = this.state.productCategories;
      fetch(endpoint + '/productCategories',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            categoryName: newCategory.categoryName,
            categoryDescription: newCategory.categoryDescription
          })
        })
        .then(console.log("fetched"));
      console.log(newCategory);
      this.setState({productCategories: [...currentCategories, newCategory.categoryName]})
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
            <MainContainer
              currentTab={this.state.currentTab}
              productData={this.state.productData}
            />
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
