import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName: ""
    }

    this.getCategoryName = this.getCategoryName.bind(this);
  }

  onCategoryChange = (event) =>{
    this.setState({categoryName: event.target.value})
  };

  getCategoryName(){
    return this.state.categoryName;
  }

  // ---------- Components ----------

  CategoryCreator(props){
    return(
      <div className={"categoryCreatorContainer"}>
        <input className={"categoryInput"} type="text" placeholder="Category Name" onChange={props.onCategoryChange}/>
        <button className={"primaryButton"}
                type={"button"}
                // onClick={props.addCategory(props.getCategoryName)}
                onClick={() => props.addCategory(props.getCategoryName())}
        >+</button>
      </div>
    );
  }

  CategoryList(props){
    return(
      <div>
        {props.categories.map((category,index) => <button key={index}>{category}</button>)}
      </div>
    )
  }

  render() {
    return (
      <div className={"left-panel"}>
        <this.CategoryList categories={this.props.categories}/>
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