import React from 'react';
import './LandingPage.css'
import {texts} from '../../strings';
class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={"landingPageImage"}>
        <div className={"landingPageContentContainer"}>
          <div className={"landingPageCompanyName"}>
            <h1>{texts.companyName}</h1>
            <p>{texts.companySlogan}</p>
          </div>
          <div className={"landingPageButtonsContainer"}>
            <button className={"landingPageButton"}
                    onClick={""}>
              {texts.products}
            </button>
            <button className={"landingPageButton"}
                    onClick={""}>
              {texts.contact}
            </button>
          </div>
          <div className={"landingPageCompanyName navHidden"}>
            <h1>{texts.companyName}</h1>
            <p>{texts.companySlogan}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;