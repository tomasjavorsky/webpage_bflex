import React from 'react';
import './LeftPanel.css';
import {texts, constants} from '../../strings';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      category_description: "",
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

  adjustCategoryOrder(category, increase){
    console.log("categoryId:" + category.category_id);
    fetch(constants.endpoint + '/productCategories',
      {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          category_id: category.category_id,
          increase: increase}
        )
      })
      .then(res => {this.props.getProductCategoriesData()})
  }

  generateProductCategoryButtons() {
    const inlineMargin ={
      marginRight: "3px",
    };

    function getCategoryImage(categoryName, categoryImages) {
      let link = "not found";
      for (let j = 0; j < categoryImages.length; j++) {
        if (categoryImages[j].category_name === categoryName) {
          link = categoryImages[j].product_image;
        }
      }
      return link;
    }

    return this.props.productCategories.map((category, index) =>
        <div key={"category" + category.category_id}>
            {this.props.adminConsoleOpen && <div>
              <button className={"secondaryButton"}
                      type={"button"}
                      style={inlineMargin}
                      onClick={() => {this.adjustCategoryOrder(category, true)}}>
                {texts.orderUP}</button>
              <button className={"secondaryButton"}
                      type={"button"}
                      style={inlineMargin}
                      onClick={() => {this.adjustCategoryOrder(category, false)}}>
                {texts.orderDown}</button>
              {category.category_order}
          </div>}
          <div className={"productCategoryButtonContainer"}>
            <div className={"productCategoryButtonImageContainer"}>
            <img className={"productCategoryButtonImage"} alt={category.category_name} src={getCategoryImage(category.category_name, this.props.categoryImages)}/>
            </div>
            <button
              className={"productCategoryButton"}
              key={index}
              onClick={() => {
                this.props.setSelectedProductCategory(category.category_name);
              }}
            >{category.category_name}</button>
          </div>
        </div>)
  }

  // ---------- COMPONENTS ----------
  CategoryCreator(props) {
    const inlineMargin = {
      marginRight: "8px",
      marginLeft: "8px"
    };

    function addProductCategory(newCategory){
      if(newCategory.category_name !== ""){
        fetch(constants.endpoint + '/productCategories',
          {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              category_name: newCategory.category_name,
              category_description: newCategory.category_description
            })
          }
        )
          .then(res => props.getProductCategoriesData())
      }
    }
    function removeProductCategory(categoryData){
      if(categoryData.category_name !== ""){
        fetch(constants.endpoint + '/productCategories',
          {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              category_name: categoryData.category_name
            })
          }
        )
          .then(res => props.getProductCategoriesData())
      }
    }

    return (
      <div className={"categoryCreatorContainer"}>
        <div>
          <input className={"categoryInput"}
               type="text"
               placeholder={texts.categoryNamePlaceholder}
               onChange={props.onCategoryNameChange}/>
          <button className={"primaryButton"}
                  type={"button"}
                  style={inlineMargin}
                  onClick={() => addProductCategory(props.getCategoryData())}
          >+</button>
          <button className={"secondaryButton"}
                  type={"button"}
                  onClick={() => removeProductCategory(props.getCategoryData())}
          >-</button>
        </div>
        <textarea className={"adminConsoleTableRows"}
                  rows="8" cols="10"
                  placeholder={texts.categoryDescriptionPlaceholder}
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
          onCategoryNameChange={this.onCategoryNameChange}
          onCategoryDescriptionChange={this.onCategoryDescriptionChange}
          getCategoryData={this.getCategoryData}
          getProductCategoriesData={this.props.getProductCategoriesData}
        />}
      </div>
    )
  }
}

export default LeftPanel;