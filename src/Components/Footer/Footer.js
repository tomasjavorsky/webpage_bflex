import React from 'react';
import './Footer.css';
import AdminLogin from './AdminLogin';
import {storage} from '../Firebase/FirebaseSetup';

const endpoint = 'http://127.0.0.1:3001';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminLoginOpen: false,
      imageFile: null,
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
    this.addProduct                 = this.addProduct.bind(this);
    this.showObject                 = this.showObject.bind(this);
    this.uploadImageToFirebase      = this.uploadImageToFirebase.bind(this);
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
  onProductImageFileChange = (event) => {
    let value = event.target.files[0];
    this.setState({
      imageFile: value
    });
    console.log(value);
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

  //-------METHODS-------
  showObject(){
    console.log(this.state.newProduct);
  }
  addProduct(){
    console.log(this.state.newProduct);
    if(this.state.newProduct.name !== ""){
      fetch(endpoint + '/products',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            product_name: this.state.newProduct.name,
            product_description: this.state.newProduct.description,
            //product_image: this.state.newProduct.imageLink,
            product_tags: this.state.newProduct.tags,
            product_columns: this.state.newProduct.tabColumns,
            product_rows: this.state.newProduct.tabRows,
            product_category: this.state.newProduct.categoryName
          })
        }
      )
    }
  }
  uploadImageToFirebase(){
    console.log("image name: " + this.state.imageFile.name);
    console.log("image: " + this.state.imageFile);
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
          .then(url => console.log("url: \n" + url))
      });
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
                   type="text" placeholder="Product Name"
                   onChange={props.onProductNameChange}/>
            <textarea className={"adminConsoleProductDescription"}
                      rows="3" cols="75"
                      placeholder="Product Description"
                      onChange={props.onProductDescriptionChange}
            />
            <input className={"adminConsoleProductTags"}
                   type="text"
                   placeholder="Product Tags (separate with ,)"
                   onChange={props.onProductTagsChange}/>
            <select className={"adminConsoleProductCategory"}
                    onChange={props.onProductCategoryChange}>
              <option key={"default"} style={inlineTextColor} value={"Vyber kategóriu"}>Vyber kategóriu</option>
              {generateProductCategories()}
            </select>
            <input className={"adminConsoleProductTags"}
                   type="file"
                   onChange={props.onProductImageFileChange}/>
          </div>
          <div className={"adminConsoleTable"}>
            <input className={"adminConsoleTableColumns"}
                   type="text"
                   placeholder="Table Columns (separate with ,)"
                   onChange={props.onProductTabColumnsChange}
            />
            <textarea className={"adminConsoleTableRows"}
                      rows="8" cols="75"
                      placeholder="Table Data (separate with ,)"
                      onChange={props.onProductTabRowsChange}
            />
          </div>
        </div>
        <div className={"adminConsoleButtonArea"}>
          <button className={"primaryButton"}
                  type={"button"}
                  onClick={props.onCreatePressed}
          >Create</button>
          <button className={"secondaryButton"}
                  type={"button"}
                  onClick={props.adminConsoleOpen}
          >Cancel</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="footer">
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
          onCreatePressed={this.uploadImageToFirebase}
        />}
      </div>
    )
  }
}

export default Footer;