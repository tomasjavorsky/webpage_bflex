import React from 'react';
import './Header.css';
import {texts} from '../../strings';
import headerImage from '../../Images/landingPageImage.jpg';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div className={"header"}>
        <div className={"headerText"}>
          <h1>{texts.companyName}</h1>
          <p>{texts.companySlogan}</p>
        </div>
      </div>
    )
  }
}

export default Header;