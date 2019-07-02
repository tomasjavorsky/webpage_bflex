import React from 'react';
import './Footer.css';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  AdminConsole(props) {
    return (
      <div className={"adminConsole"}>
        <div className={"adminConsoleFields"}>
          <div className={"adminConsoleDescription"}>
            <input className={"adminConsoleProductName"} type="text" placeholder="Product Name"/>
            <textarea className={"adminConsoleProductDescription"} rows="5" cols="75"
                      placeholder="Product Description"/>
            <input className={"adminConsoleProductTags"} type="text"
                   placeholder="Product Tags (separate with ,)"/>
            <select className={"adminConsoleProductCategory"}>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className={"adminConsoleTable"}>
            <input className={"adminConsoleTableColumns"} type="text"
                   placeholder="Table Columns (separate with ,)"/>
            <textarea className={"adminConsoleTableRows"} rows="8" cols="75"
                      placeholder="Table Data (separate with ,)"/>
          </div>
        </div>
        <div className={"adminConsoleButtonArea"}>
          <button className={"primaryButton"} type={"button"} onClick={""}>Create</button>
          <button className={"secondaryButton"} type={"button"} onClick={props.adminConsoleClick}>Cancel</button>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <button className={"adminButton"} type={"button"} onClick={this.props.adminConsoleClick}/>
        {this.props.adminConsoleOpen && <this.AdminConsole adminConsoleClick={this.props.adminConsoleClick}/>}
      </div>
    )
  }
}

export default Footer;