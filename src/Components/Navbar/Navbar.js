import React from 'react';
import './Navbar.css';
import {texts} from '../../strings';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <div className={"navbar"}>
        <div className={"navHidden"}>
          <input type="text"/>
          <button type={"button"}>{texts.search}</button>
        </div>
        <div className={"navButtons"}>
          <button onClick={this.props.productsTabClicked}>{texts.products}</button>
          <button onClick={this.props.contactTabClicked}>{texts.contact}</button>
          <button onClick={this.props.howToOrderTabClicked}>{texts.howToOrder}</button>
        </div>
        <div className={"navSearch"}>
          <input type="text"/>
          <button type={"button"}>{texts.search}</button>
        </div>
      </div>
    )
  }
}

export default Navbar;