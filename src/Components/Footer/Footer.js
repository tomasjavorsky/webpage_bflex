import React from 'react';
import './Footer.css';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminConsoleOpen: false
    };
    this.adminConsoleClicked = this.adminConsoleClicked.bind(this);
  }

  adminConsoleClicked(){
    this.setState(state => ({adminConsoleOpen: !this.state.adminConsoleOpen}));
  }

  AdminConsole(props){
    return(
      <div className={"adminConsole"}>
        <div className={"adminConsoleFields"}>
          <div className={"adminConsoleDescription"}>
            <input className={"adminConsoleProductName"} type="text" placeholder="Product Name"></input>
            <textarea className={"adminConsoleProductDescription"} rows = "5" cols = "75" placeholder="Product Description"></textarea>
            <input className={"adminConsoleProductTags"} type="text" placeholder="Product Tags"></input>
          </div>
          <div className={"adminConsoleTable"}>
            <input className={"adminConsoleTableColumns"} type="text" placeholder="Table Columns (separate with ,)"></input>
            <textarea className={"adminConsoleTableRows"} rows = "7" cols = "75" placeholder="Table Data (separate with ,)"></textarea>
          </div>
        </div>
        <div className={"adminConsoleButtonArea"}>
          <button className={"primaryButton"} type={"button"} onClick={""}>Create</button>
          <button className={"secondaryButton"} type={"button"} onClick={""}>Cancel</button>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <button className={"adminButton"} type={"button"} onClick={this.adminConsoleClicked}/>
        {this.state.adminConsoleOpen && <this.AdminConsole />}
      </div>
    )
  }
}

export default Footer;