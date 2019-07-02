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

  render() {
    return (
      <div className={"left-panel"}>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        {this.props.adminConsoleOpen && <this.CategoryCreator/>}
      </div>
    )
  }
}

export default LeftPanel;