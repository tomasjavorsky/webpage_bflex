import React from 'react';
import './Footer.css';
import AdminLogin from './AdminLogin';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminLoginOpen: false,
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
    this.showObject                 = this.showObject.bind(this);
  }

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

  showObject(){
    console.log(this.state.newProduct);
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
            <input className={"adminConsoleProductName"}
                   type="text" placeholder="Product Name"
                   onChange={props.onProductNameChange}/>
            <textarea className={"adminConsoleProductDescription"}
                      rows="5" cols="75"
                      placeholder="Product Description"
                      onChange={props.onProductDescriptionChange}
            />
            <input className={"adminConsoleProductTags"}
                   type="text"
                   placeholder="Product Tags (separate with ,)"
                   onChange={props.onProductTagsChange}/>
            <select className={"adminConsoleProductCategory"} onChange={props.onProductCategoryChange}>
              {generateProductCategories()}
            </select>
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
        {this.state.adminLoginOpen &&
        <AdminLogin adminConsoleOpen={this.adminConsoleOpen}
                    cancelPressed={this.adminLoginCancel}/>}
        {this.props.adminConsoleOpen &&
        <this.AdminConsole
          adminConsoleOpen={this.adminConsoleOpen}
          productCategories={this.props.productCategories}
          onProductNameChange={this.onProductNameChange}
          onProductDescriptionChange={this.onProductDescriptionChange}
          onProductTagsChange={this.onProductTagsChange}
          onProductCategoryChange={this.onProductCategoryChange}
          onProductTabColumnsChange={this.onProductTabColumnsChange}
          onProductTabRowsChange={this.onProductTabRowsChange}
          onCreatePressed={this.showObject}
        />}
      </div>
    )
  }
}

export default Footer;