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
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div>
    )
  }
}

export default Navbar;