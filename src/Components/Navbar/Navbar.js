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
        <button onClick="#">Produkty</button>
        <button onClick="#">Kontakt</button>
      </div>
    )
  }
}

export default Navbar;