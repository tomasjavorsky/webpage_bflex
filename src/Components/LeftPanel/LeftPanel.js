import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName: ""
    };
    this.getCategoryName = this.getCategoryName.bind(this);
  }

  onCategoryChange = (event) => {
    this.setState({categoryName: event.target.value})
  };

  getCategoryName() {
    return this.state.categoryName;
  }

  generateProductCategoryButtons() {
    return this.props.categories.map((category, index) => <button className={"productCategoryButton"}
                                                                  key={index}>{category}</button>)
  }

  // ---------- Components ----------

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
               onChange={props.onCategoryChange}/>
          <button className={"primaryButton"}
                  type={"button"}
                  style={inlineMargin}
                  onClick={() => props.addCategory(props.getCategoryName())}
          >+</button>
          <button className={"secondaryButton"}
                  type={"button"}
          >-</button>
        </div>
        <textarea className={"adminConsoleTableRows"}
                  rows="8" cols="10"
                  placeholder="Category description"/>

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
          onCategoryChange={this.onCategoryChange}
          getCategoryName={this.getCategoryName}
        />}
      </div>
    )
  }
}

export default LeftPanel;