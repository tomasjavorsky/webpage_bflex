import React from 'react';
import './MainContainer.css';
import Product from '../Product/Product';
import {constants, texts} from '../../strings';
import {storage} from "../../Firebase/FirebaseSetup";
import {css} from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "products",
      jobListings: [],
      downloadFiles: [],
      isUploading: false,
    };

    this.getCurrentJobListings = this.getCurrentJobListings.bind(this);
    this.getCurrentDownloadFiles = this.getCurrentDownloadFiles.bind(this);
    this.setUploading = this.setUploading.bind(this);

    //-------DATA FROM DB-------
    this.getCurrentJobListings();
    this.getCurrentDownloadFiles();
  }

  //-------HELPER FUNCTIONS-------
  getCurrentJobListings(){
      fetch(constants.endpoint+'/jobListings')
        .then(res => res.json())
        .then(res => this.setState({jobListings: res}))
        .catch(err => console.log(err));
  }
  getCurrentDownloadFiles(){
    fetch(constants.endpoint+'/downloadFiles')
      .then(res => res.json())
      .then(res => {
        this.setState({downloadFiles: res});
        })
      .catch(err => console.log(err));
  }
  setUploading = () => {
    this.setState({isUploading: !this.state.isUploading})
  };

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
    let fileName = "";
    let fileDescription = "";
    let localFileLink = "";
    let firebaseFileLink = "";

    const onFileNameChange = (event) => {
      fileName = event.target.value;
    };
    const onFileDescriptionChange = (event) => {
      fileDescription = event.target.value;
    };
    const onFileChange = (event) => {
      localFileLink = event.target.files[0];
    };

    function createNewFile(){
      const uploadTask = storage
        .ref(`download_files/${fileName}`)
        .put(localFileLink);
      uploadTask.on('state_changed',
        (snapshot) =>{
          //progress
        },
        (error) =>{
          console.log(error);
        },
        (complete) =>{
          console.log("file uploaded");
          storage
            .ref('download_files')
            .child(fileName)
            .getDownloadURL()
            .then(url => {firebaseFileLink = url})
            .then(() => {
              console.log(firebaseFileLink);
              addFileToDB()
            })
        });
    }
    function addFileToDB(){
      if(fileName !== ""){
        fetch(constants.endpoint + '/downloadFiles',
          {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              file_name: fileName,
              file_description: fileDescription,
              file_link: firebaseFileLink,
            })
          }
        )
          .then(res => {
            props.setUploading();
            props.getCurrentDownloadFiles();
          })
      }
    }
    function deleteFile(file) {
      fetch(constants.endpoint + '/downloadFiles',
        {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              file_id: file.file_id
            }
          )
        })
        .then(res => {
          console.log("deleting");
          props.getCurrentDownloadFiles();
        })
        .catch(res => console.log("unable to delete file"))
    }
    function generateFilesCards() {
      return(
        props.downloadFiles.map((file) => <div key={"file"+file.file_id} className={"contactTabInfo"}>
          {props.adminConsoleOpen && <button className={"primaryButton deleteButton"}
                                             type={"button"}
                                             onClick={() => deleteFile(file)}>
            {texts.delete}</button>}
          <h2>{file.file_name}</h2>
          <p>{file.file_description}</p>
          <a href={file.file_link}>{texts.downloadLink}</a>
        </div>)
      )
    }

    return(
      <div className={"contactTab"}>
        <h2>{texts.downloads}</h2>
        {generateFilesCards()}
        {props.adminConsoleOpen && <div className={"jobCreateTab"}>
          <input className={"adminConsoleTableColumns"}
                 type="text"
                 placeholder={texts.fileNamePlaceholder}
                 onChange={onFileNameChange}
          />
          <textarea className={"adminConsoleTableRows"}
                    rows="8" cols="75"
                    placeholder={texts.fileDescriptionPlaceholder}
                    onChange={onFileDescriptionChange}
          />
          <input className={"adminConsoleProductTags"}
                 type="file"
                 onChange={onFileChange}/>
          <div>
            <BarLoader
              css={override}
              sizeUnit={"px"}
              size={10}
              color={'#ff9900'}
              loading={props.isUploading}
            />
            {!props.isUploading && <button className={"primaryButton"}
                                           type={"button"}
                                           onClick={()=>{
                                             props.setUploading();
                                             createNewFile();
                                           }}
            >{texts.create}</button>}
          </div>
        </div>}
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
            <h2>{job.job_name}</h2>
            <p>{job.job_description}</p>
          </div>)
        )
      }
    }
    return(
      <div className={"contactTab"}>
        <h2>{texts.jobs}</h2>
        {generateJobCards()}
        {props.adminConsoleOpen && <div className={"jobCreateTab"}>
          <input className={"adminConsoleTableColumns"}
                 type="text"
                 placeholder={texts.jobNamePlaceholder}
                 onChange={onJobNameChange}
          />
          <textarea className={"adminConsoleTableRows"}
                    rows="8" cols="75"
                    placeholder={texts.jobDescriptionPlaceholder}
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

  //----MAIN----
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
        {this.props.currentTab === "howToOrder" && <this.HowToOrder/>}
        {this.props.currentTab === "downloads" && <this.Downloads
          adminConsoleOpen={this.props.adminConsoleOpen}
          downloadFiles={this.state.downloadFiles}
          getCurrentDownloadFiles={this.getCurrentDownloadFiles}
          setUploading={this.setUploading}
          isUploading={this.state.isUploading}
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