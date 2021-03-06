import React from 'react';
import './Footer.css';
import AdminLogin from './AdminLogin';
import {storage} from '../../Firebase/FirebaseSetup';
import {css} from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import {texts, constants} from '../../strings';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      adminLoginOpen: false,
      imageFile: null,
      isUploading: false,
      newProduct:{
        name: "",
        description: "",
        imageLink: "",
        tags: "",
        categoryName: "",
        tabColumns: "",
        tabRows: ""
      }
    };
    this.adminLoginClick            = this.adminLoginClick.bind(this);
    this.adminConsoleOpen           = this.adminConsoleOpen.bind(this);
    this.adminLoginCancel           = this.adminLoginCancel.bind(this);
    this.onProductNameChange        = this.onProductNameChange.bind(this);
    this.onProductDescriptionChange = this.onProductDescriptionChange.bind(this);
    this.onProductTagsChange        = this.onProductTagsChange.bind(this);
    this.onProductCategoryChange    = this.onProductCategoryChange.bind(this);
    this.onProductTabColumnsChange  = this.onProductTabColumnsChange.bind(this);
    this.onProductTabRowsChange     = this.onProductTabRowsChange.bind(this);
    this.onProductImageFileChange   = this.onProductImageFileChange.bind(this);
    this.addProductToDB             = this.addProductToDB.bind(this);
    this.showObject                 = this.showObject.bind(this);
    this.setProductImageLink        = this.setProductImageLink.bind(this);
    this.createNewProduct           = this.createNewProduct.bind(this);
    this.setUploading               = this.setUploading.bind(this);
  }

  //-------INPUT EVENTS-------
  onProductNameChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.name = value;
      return {newProduct};
    });
  };
  onProductDescriptionChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.description = value;
      return {newProduct};
    });
  };
  onProductTagsChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.tags = value;
      return {newProduct};
    });
  };
  onProductCategoryChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.categoryName = value;
      return {newProduct};
    });
  };
  onProductTabColumnsChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.tabColumns = value;
      return {newProduct};
    });
  };
  onProductTabRowsChange = (event) => {
    let value = event.target.value;
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.tabRows = value;
      return {newProduct};
    });
  };
  setProductImageLink = (link) => {
    this.setState(prevState => {
      let newProduct = {...prevState.newProduct};
      newProduct.imageLink = link;
      return {newProduct};
    });
  };
  onProductImageFileChange = (event) => {
    let value = event.target.files[0];
    this.setState({
      imageFile: value
    });
  };
  setUploading = () => {
    this.setState({isUploading: !this.state.isUploading})
  };

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

  //-------HELPER FUNCTIONS-------
  showObject(){
    console.log(this.state.newProduct);
  }
  addProductToDB(){
    if(this.state.newProduct.name !== ""){
      fetch(constants.endpoint + '/products',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            product_name: this.state.newProduct.name,
            product_description: this.state.newProduct.description,
            product_image: this.state.newProduct.imageLink,
            product_tags: this.state.newProduct.tags,
            product_columns: this.state.newProduct.tabColumns,
            product_rows: this.state.newProduct.tabRows,
            product_category: this.state.newProduct.categoryName
          })
        }
      )
        .then(res => {
          this.setUploading();
          this.props.getCurrentCategoryData()
        })
    }
  }
  createNewProduct(){
    const uploadTask = storage
      .ref(`product_images/${this.state.imageFile.name}`)
      .put(this.state.imageFile);
    uploadTask.on('state_changed',
      (snapshot) =>{
        //progress
      },
      (error) =>{
        console.log(error);
      },
      (complete) =>{
        console.log("image uploaded");
        storage
          .ref('product_images')
          .child(this.state.imageFile.name)
          .getDownloadURL()
          .then(url => this.setProductImageLink(url))
          .then(() => {
              console.log(this.state.newProduct.imageLink);
              this.addProductToDB()
            })
          });
  }

  //-------LIFECYCLE--------
  componentDidMount() {
    window.$('#year').text(" " + new Date().getFullYear() + " ");
  }

  //-------COMPONENTS-------
  AdminConsole(props) {
    function getProductCategoriesNames(productCategoriesData){
      return Array.from(productCategoriesData, x => x.category_name);
    }
    function generateProductCategories(){
      return getProductCategoriesNames(props.productCategories)
        .map((option,index) => <option key={index} value={option}>{option}</option>);
    }

    const inlineTextColor = {
      color: "var(--colorUISemiLightDarker)"
    };

    return (
      <div className={"adminConsole"}>
        <div className={"adminConsoleFields"}>
          <div className={"adminConsoleDescription"}>
            <input className={"adminConsoleProductName"}
                   type="text"
                   placeholder={texts.productNamePlaceholder}
                   onChange={props.onProductNameChange}/>
            <textarea className={"adminConsoleProductDescription"}
                      rows="3" cols="75"
                      placeholder={texts.productDescriptionPlaceholder}
                      onChange={props.onProductDescriptionChange}/>
            <input className={"adminConsoleProductTags"}
                   type="text"
                   placeholder={texts.productTagsPlaceholder}
                   onChange={props.onProductTagsChange}/>
            <select className={"adminConsoleProductCategory"}
                    onChange={props.onProductCategoryChange}>
              <option key={"default"}
                      style={inlineTextColor}
                      value={texts.chooseCategoryPlaceholder}
              >{texts.chooseCategoryPlaceholder}</option>
              {generateProductCategories()}
            </select>
            <input className={"adminConsoleProductTags"}
                   type="file"
                   onChange={props.onProductImageFileChange}/>
          </div>
          <div className={"adminConsoleTable"}>
            <input className={"adminConsoleTableColumns"}
                   type="text"
                   placeholder={texts.tableColumnsPlaceholder}
                   onChange={props.onProductTabColumnsChange}
            />
            <textarea className={"adminConsoleTableRows"}
                      rows="8" cols="75"
                      placeholder={texts.tableRowsPlaceholder}
                      onChange={props.onProductTabRowsChange}
            />
          </div>
        </div>
        <div className={"adminConsoleButtonArea"}>
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
                    props.onCreatePressed();
                  }}
          >{texts.create}</button>}
          {!props.isUploading && <button className={"secondaryButton"}
                  type={"button"}
                  onClick={props.adminConsoleOpen}
          >{texts.close}</button>}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <div className={"footerText"}>
          <p>
            Copyright ©
            <span id={"year"}></span>
            {texts.companyName} Všetky práva vyhradené.
          </p>
          <p className={"footerBorderLeft"}>
            Created by Tomus
          </p>
        </div>
        <button className={"adminButton"} type={"button"} onClick={this.adminLoginClick}/>
        {this.state.adminLoginOpen && <AdminLogin
          adminConsoleOpen={this.adminConsoleOpen}
          cancelPressed={this.adminLoginCancel}/>}
        {this.props.adminConsoleOpen && <this.AdminConsole
          adminConsoleOpen={this.adminConsoleOpen}
          productCategories={this.props.productCategories}
          onProductNameChange={this.onProductNameChange}
          onProductDescriptionChange={this.onProductDescriptionChange}
          onProductTagsChange={this.onProductTagsChange}
          onProductCategoryChange={this.onProductCategoryChange}
          onProductTabColumnsChange={this.onProductTabColumnsChange}
          onProductTabRowsChange={this.onProductTabRowsChange}
          onProductImageFileChange={this.onProductImageFileChange}
          onCreatePressed={this.createNewProduct}
          isUploading={this.state.isUploading}
          setUploading={this.setUploading}
        />}
      </div>
    )
  }
}

export default Footer;