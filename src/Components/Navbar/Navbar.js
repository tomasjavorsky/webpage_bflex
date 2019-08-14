import React from 'react';
import './Navbar.css';
import {texts} from '../../strings';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
    }
  }

  onKeywordChanged = (event) =>{
    this.setState({searchKeyword: event.target.value});
  };

  render() {
    const inlineStyle = {
      color: "var(--colorPrimaryDark)"
    };
    return (
      <div className={"navbar"}>
        <div className={"navHidden"}>
          <input type="text"/>
          <button type={"button"}>{texts.search}</button>
        </div>
        <div className={"navButtons"}>
          <button onClick={this.props.productsTabClicked}>                {texts.products}</button>
          <button onClick={this.props.contactTabClicked}>                 {texts.contact}</button>
          <button onClick={this.props.howToOrderTabClicked}>              {texts.howToOrder}</button>
          <button onClick={this.props.downloadsTabClicked}>               {texts.downloads}</button>
          <button onClick={this.props.jobsTabClicked} style={inlineStyle}>{texts.jobs}</button>
        </div>
        <div className={"navSearch"}>
          <input
            type="text"
            onChange={this.onKeywordChanged}
          />
          <button
            type={"button"}
            onClick={() => {this.props.searchProducts(this.state.searchKeyword)}}
          >{texts.search}</button>
        </div>
      </div>
    )
  }
}

export default Navbar;