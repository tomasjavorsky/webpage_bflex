import React from 'react';
import './Footer.css';
import AdminLogin from './AdminLogin';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminLoginOpen: false

    };
    this.adminLoginClick = this.adminLoginClick.bind(this);
    this.adminConsoleOpen = this.adminConsoleOpen.bind(this);
    this.adminLoginCancel = this.adminLoginCancel.bind(this);
  }

  adminLoginClick(){
    this.setState({adminLoginOpen: true});
  }

  adminLoginCancel(){
    this.setState({adminLoginOpen: false});
  }

  adminConsoleOpen(){
    this.setState({adminLoginOpen: false});
    this.props.adminConsoleClick();
  }

  AdminConsole(props) {

    function generateProductCategories(){
      return props.productCategories.map((option,index) => <option key={index} value={option}>{option}</option>);
    }

    return (
      <div className={"adminConsole"}>
        <div className={"adminConsoleFields"}>
          <div className={"adminConsoleDescription"}>
            <input className={"adminConsoleProductName"} type="text" placeholder="Product Name"/>
            <textarea className={"adminConsoleProductDescription"} rows="5" cols="75" placeholder="Product Description"/>
            <input className={"adminConsoleProductTags"} type="text" placeholder="Product Tags (separate with ,)"/>
            <select className={"adminConsoleProductCategory"}>
              {generateProductCategories()}
            </select>
          </div>
          <div className={"adminConsoleTable"}>
            <input className={"adminConsoleTableColumns"} type="text" placeholder="Table Columns (separate with ,)"/>
            <textarea className={"adminConsoleTableRows"} rows="8" cols="75" placeholder="Table Data (separate with ,)"/>
          </div>
        </div>
        <div className={"adminConsoleButtonArea"}>
          <button className={"primaryButton"} type={"button"} onClick={""}>Create</button>
          <button className={"secondaryButton"} type={"button"} onClick={props.adminConsoleOpen}>Cancel</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <button className={"adminButton"} type={"button"} onClick={this.adminLoginClick}/>
        {this.state.adminLoginOpen && <AdminLogin adminConsoleOpen={this.adminConsoleOpen} cancelPressed={this.adminLoginCancel}/>}
        {this.props.adminConsoleOpen &&
        <this.AdminConsole
          adminConsoleOpen={this.adminConsoleOpen}
          productCategories={this.props.productCategories}
        />}
      </div>
    )
  }
}

export default Footer;