import React from 'react';
import './LandingPage.css'
import {texts} from '../../strings';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  generateCategoryThumbnails(){
    return(
      this.props.categoryImages.map((categoryImage) =>
        <div key={"productThumbnail" + categoryImage.category_name} className={"landingCategoryImageContainer"} onClick={() => this.props.landingSetSelectedProductCategory(categoryImage.category_name)}>
          <img className={"landingCategoryImage"} alt={categoryImage.category_name} src={categoryImage.product_image} />
          <h4 className={"landingCategoryName"}>{categoryImage.category_name}</h4>
        </div>
      )
    )
  }

  render() {
    return (
      <div className={"landingPageContainer"}>
        <div className={"landingPageCompanyText landingHideOnSmall"}>
          <h1>{texts.companyName}</h1>
          <p>{texts.companySlogan}</p>
        </div>
        <div className={"landingHideOnSmall"}>
          <h2 className={"landingPageCategoriesHeader"}>Kategórie Produktov:</h2>
          <div className={"landingPageCategoriesHeaderLine"} />
          <div className={"landingPageCategoriesContainer"}>
            {this.generateCategoryThumbnails()}
          </div>
          <div className={"landingPageCategoriesHeaderLine"} />
          <div className={"landingPageFooter"} >
            <button onClick={this.props.landingProductsTabClicked}>{texts.products}</button>
            <button onClick={this.props.landingContactTabClicked}>{texts.contact}</button>
            <button onClick={this.props.landingDownloadsTabClicked}>{texts.downloads}</button>
            <button onClick={this.props.landingJobsTabClicked}>{texts.jobs}</button>
          </div>
        </div>

        <div className={"landingShowOnSmall"}>
          <div className={"landingPageCompanyText"}>
            <h1>{texts.companyName}</h1>
            <p>{texts.companySlogan}</p>
          </div>
          <div className={"landingPageFooter"} >
            <button onClick={this.props.landingProductsTabClicked}>{texts.products}</button>
            <button onClick={this.props.landingContactTabClicked}>{texts.contact}</button>
            <button onClick={this.props.landingDownloadsTabClicked}>{texts.downloads}</button>
            <button onClick={this.props.landingJobsTabClicked}>{texts.jobs}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;