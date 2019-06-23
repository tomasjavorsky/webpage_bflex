import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={"left-panel"}>
        {/*<ul>*/}
        {/*  <li><a href="#">Link</a></li>*/}
        {/*  <li><a href="#">Link</a></li>*/}
        {/*  <li><a href="#">Link</a></li>*/}
        {/*  <li><a href="#">Link</a></li>*/}
        {/*</ul>*/}

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

      </div>
    )
  }
}

export default LeftPanel;