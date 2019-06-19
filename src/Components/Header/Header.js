import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div className={"header"}>
        <h1>Bflex, s.r.o.</h1>
        <p>Predaj a technické poradenstvo</p>
      </div>
    )
  }
}

export default Header;