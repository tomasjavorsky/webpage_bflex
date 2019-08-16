import React from 'react';
import './MainContainer.css';
import Product from '../Product/Product';
import {constants, texts} from '../../strings';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "products",
      jobListings: [],
    };

    this.getCurrentJobListings = this.getCurrentJobListings.bind(this);

    //-------DATA FROM DB-------
    this.getCurrentJobListings();
  }

  //-------HELPER FUNCTIONS-------
  getCurrentJobListings(){
      fetch(constants.endpoint+'/jobListings')
        .then(res => res.json())
        .then(res => this.setState({jobListings: res}))
        .catch(err => console.log(err));
  }

  ProductsTab(props){
    function productGenerator(productData) {
      return productData.map((currentProduct) => <Product
        key={"productKey"+currentProduct.product_id}
        id={currentProduct.product_id}
        name={currentProduct.product_name}
        imageLink={currentProduct.product_image}
        description={currentProduct.product_description}
        tags={currentProduct.product_tags}
        tabColumns={currentProduct.product_columns}
        tabRows={currentProduct.product_rows}
        adminConsoleOpen={props.adminConsoleOpen}
        getCurrentCategoryData={props.getCurrentCategoryData}
        addProductToCart={props.addProductToCart}
      />)
    }
    return(
      <div className={"productTab"}>
        <h2>{props.selectedProductCategoryData.category_name}</h2>
        <p>{props.selectedProductCategoryData.category_description}</p>
        {productGenerator(props.productData)}
      </div>
    );
  }

  ContactTab(props){
    return(
      <div className={"contactTab"}>
        <h2>{texts.contact}</h2>
        <div className={"contactTabInfo"}>
          <h4>{texts.companyName}</h4>
          {texts.companyContactInfo}
        </div>
      </div>
    );
  }

  HowToOrder(props){
    return(
      <div className={"contactTab"}>
        <h2>{texts.howToOrder}</h2>
        <div className={"contactTabInfo howToTab"}>
          <p>{texts.howToOrderDescription}</p>
        </div>
      </div>
    );
  }

  Downloads(props){
    return(
      <div className={"contactTab"}>
        <h2>{texts.downloads}</h2>
        <div className={"contactTabInfo howToTab"}>
          <p>{texts.jobsDescription}</p>
        </div>
      </div>
    );
  }

  Jobs(props){

    let jobName = "";
    let jobDescription = "";

    const onJobNameChange = (event) => {
      jobName = event.target.value;
    };

    const onJobDescriptionChange = (event) => {
      jobDescription = event.target.value;
    };

    function generateJobCards(){
      if(props.jobListings.length === 0){
        return(
          <div className={"contactTabInfo howToTab"}>
            <p>{texts.noJobsOpenATM}</p>
          </div>
        )
      }
      else{
        return(
          props.jobListings.map((job) => <div key={"job"+job.job_id} className={"contactTabInfo"}>
            {props.adminConsoleOpen && <button className={"primaryButton deleteButton"}
                                                    type={"button"}
                                                    onClick={() => deleteJob(job)}>
              {texts.delete}</button>}
            <h1>{job.job_name}</h1>
            <p>{job.job_description}</p>
          </div>)
        )
      }
    }
    function deleteJob(job) {
      fetch(constants.endpoint + '/jobListings',
        {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              job_id: job.job_id
            }
          )
        })
        .then(res => {
          console.log("deleting");
          props.getCurrentJobListings()
        })
        .catch(res => console.log("unable to delete job listing"))
    }
    function addJob(){
      if(jobName !== ""){
        fetch(constants.endpoint + '/jobListings',
          {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              job_name: jobName,
              job_description: jobDescription,
            })
          }
        )
          .then(res => {
            console.log("job added");
            props.getCurrentJobListings();
          })
      }
    }
    return(
      <div className={"contactTab"}>
        <h2>{texts.jobs}</h2>
        {generateJobCards()}
        {props.adminConsoleOpen && <div className={"jobCreateTab"}>
          <input className={"adminConsoleTableColumns"}
                 type="text"
                 placeholder={texts.jobName}
                 onChange={onJobNameChange}
          />
          <textarea className={"adminConsoleTableRows"}
                    rows="8" cols="75"
                    placeholder={texts.jobDescription}
                    onChange={onJobDescriptionChange}
          />
          <div>
            <button className={"primaryButton"}
                    type={"button"}
                    onClick={addJob}
            >{texts.create}</button>
          </div>
        </div>}
      </div>
    );
  }

  render() {
    return (
      <div className={'main'}>
        {this.props.currentTab === "products" &&
        <this.ProductsTab
          productData={this.props.productData}
          selectedProductCategoryData={this.props.selectedProductCategoryData}
          adminConsoleOpen={this.props.adminConsoleOpen}
          getCurrentCategoryData={this.props.getCurrentCategoryData}
          addProductToCart={this.props.addProductToCart}
        />}
        {this.props.currentTab === "contact" && <this.ContactTab/>}
        {this.props.currentTab === "howToOrder" && <this.HowToOrder
          adminConsoleOpen={this.props.adminConsoleOpen}
        />}
        {this.props.currentTab === "downloads" && <this.Downloads
          adminConsoleOpen={this.props.adminConsoleOpen}
        />}
        {this.props.currentTab === "jobs" && <this.Jobs
          adminConsoleOpen={this.props.adminConsoleOpen}
          jobListings={this.state.jobListings}
          getCurrentJobListings={this.getCurrentJobListings}
        />}
      </div>
    );
  }
}

export default MainContainer;