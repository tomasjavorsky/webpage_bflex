import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  CategoryCreator(props){
    return(
      <div className={"categoryCreatorContainer"}>
        <input className={"categoryInput"} type="text" placeholder="Category Name"/>
        <button className={"primaryButton"} type={"button"} onClick={""}>+</button>
      </div>
    );
  }

  CategoryList(props){
    return(
      <div>
        {props.categories.map((category,index) => <button key={index} href="#">{category}</button>)}
      </div>
    )
  }

  render() {
    return (
      <div className={"left-panel"}>
        <this.CategoryList categories={this.props.categories}/>
        {this.props.adminConsoleOpen && <this.CategoryCreator/>}
      </div>
    )
  }
}

export default LeftPanel;