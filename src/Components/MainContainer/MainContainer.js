import React from 'react';
import './MainContainer.css';
import Product from '../Product/Product';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={'main'}>
        <h2>TITLE HEADING</h2>
        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco.</p>
        <Product/>
        <Product/>
        <Product/>
      </div>
    )
  }
}

export default MainContainer;