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

  onCategoryChange = (event) =>{
    this.setState({categoryName: event.target.value})
  };

  getCategoryName(){
    return this.state.categoryName;
  }

  generateProductCategoryButtons(){
    return this.props.categories.map((category,index) => <button className={"productCategoryButton"} key={index}>{category}</button>)
  }

  // ---------- Components ----------

  CategoryCreator(props){
    return(
      <div className={"categoryCreatorContainer"}>
        <input className={"categoryInput"} type="text" placeholder="Category Name" onChange={props.onCategoryChange}/>
        <button className={"primaryButton"}
                type={"button"}
                onClick={() => props.addCategory(props.getCategoryName())}
        >+</button>
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