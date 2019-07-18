import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      category_description: ""
    };
    this.getCategoryData = this.getCategoryData.bind(this);
  }

  //-------INPUT EVENTS-------
  onCategoryNameChange = (event) => {
    this.setState({category_name: event.target.value});
  };
  onCategoryDescriptionChange = (event) => {
    this.setState({category_description: event.target.value});
  };

  //-------HELPER METHODS-------
  getCategoryData() {
    let categoryData = {
      category_name: this.state.category_name,
      category_description: this.state.category_description
    };
    console.log(categoryData);
    return categoryData;
  }

  getProductCategoryNames(productCategoriesData){
    return Array.from(productCategoriesData, x => x.category_name);
  }

  generateProductCategoryButtons() {
    return this.getProductCategoryNames(this.props.productCategories)
      .map((categoryName, index) => <button
        className={"productCategoryButton"}
        key={index}
        onClick={() => this.props.setSelectedProductCategory(categoryName)}
      >{categoryName}</button>)
  }

  // ---------- COMPONENTS ----------
  CategoryCreator(props) {
    const inlineMargin = {
      marginRight: "8px",
      marginLeft: "8px"
    };
    const endpoint = 'http://127.0.0.1:3001';

    function removeProductCategory(categoryData){
      if(categoryData.category_name !== ""){
        fetch(endpoint + '/productCategories',
          {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              category_name: categoryData.category_name
            })
          }
        )
      }
    }

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
                  onClick={() => props.addProductCategory(props.getCategoryData())}
          >+</button>
          <button className={"secondaryButton"}
                  type={"button"}
                  onClick={() => removeProductCategory(props.getCategoryData())}
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
          addProductCategory={this.props.addProductCategory}
          onCategoryNameChange={this.onCategoryNameChange}
          onCategoryDescriptionChange={this.onCategoryDescriptionChange}
          getCategoryData={this.getCategoryData}
        />}
      </div>
    )
  }
}

export default LeftPanel;