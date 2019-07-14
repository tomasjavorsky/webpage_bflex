import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      categoryDescription: ""
    };
    this.getCategoryData = this.getCategoryData.bind(this);
  }

  //-------INPUT EVENTS-------
  onCategoryNameChange = (event) => {
    this.setState({categoryName: event.target.value})
  };
  onCategoryDescriptionChange = (event) => {
    this.setState({categoryDescription: event.target.value})
  };

  //-------HELPER METHODS-------
  getCategoryData() {
    return ({
      categoryName: this.state.categoryName,
      categoryDescription: this.state.categoryDescription
    });
  }
  getProductCategoriesNames(productCategoriesData){
    console.log(Array.from(productCategoriesData, x => x.categoryName));
    return Array.from(productCategoriesData, x => x.categoryName);
  }
  generateProductCategoryButtons() {
    return this.getProductCategoriesNames(this.props.categories)
      .map((category, index) => <button
        className={"productCategoryButton"}
        key={index}>{category}</button>)
  }

  // ---------- COMPONENTS ----------
  CategoryCreator(props) {
    const inlineMargin = {
      marginRight: "8px",
      marginLeft: "8px"
    };
    return (
      <div className={"categoryCreatorContainer"}>
        <div>
          <input className={"categoryInput"}
               type="text"
               placeholder="Category Name"
               onChange={props.onCategoryNameChange}/>
          <button className={"primaryButton"}
                  type={"button"}
                  style={inlineMargin}
                  onClick={() => props.addCategory(props.getCategoryData())}
          >+</button>
          <button className={"secondaryButton"}
                  type={"button"}
          >-</button>
        </div>
        <textarea className={"adminConsoleTableRows"}
                  rows="8" cols="10"
                  placeholder="Category description"
                  onChange={props.onCategoryDescriptionChange}/>

      </div>
    );
  }

  render() {
    return (
      <div className={"left-panel"}>
        {this.generateProductCategoryButtons()}
        {this.props.adminConsoleOpen &&
        <this.CategoryCreator
          addCategory={this.props.addCategory}
          onCategoryNameChange={this.onCategoryNameChange}
          onCategoryDescriptionChange={this.onCategoryDescriptionChange}
          getCategoryData={this.getCategoryData}
        />}
      </div>
    )
  }
}

export default LeftPanel;