import React from 'react';
import './Navbar.css';

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
          <button type={"button"}>Hľadať</button>
        </div>
        <div className={"navButtons"}>
          <button onClick={this.props.productsTabClicked}>Produkty</button>
          <button onClick={this.props.contactTabClicked}>Kontakt</button>
          <button onClick={this.props.howToOrderTabClicked}>Ako Objednať</button>
        </div>
        <div className={"navSearch"}>
          <input type="text"/>
          <button type={"button"}>Hľadať</button>
        </div>
      </div>
    )
  }
}

export default Navbar;