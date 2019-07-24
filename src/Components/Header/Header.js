import React from 'react';
import './Header.css';
import {texts} from '../../strings';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div className={"header"}>
        <h1>{texts.companyName}</h1>
        <p>{texts.companySlogan}</p>
      </div>
    )
  }
}

export default Header;