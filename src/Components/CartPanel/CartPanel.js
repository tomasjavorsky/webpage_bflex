import React from 'react';
import './CartPanel.css';
import {constants, texts} from "../../strings";
import Modal from 'react-responsive-modal';

class CartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      customerName: "",
      customerEmail: "",
    };

    this.onOpenModal            = this.onOpenModal.bind(this);
    this.onCloseModal           = this.onCloseModal.bind(this);
    this.onCustomerNameChange   = this.onCustomerNameChange.bind(this);
    this.onCustomerEmailChange  = this.onCustomerEmailChange.bind(this);
    this.sendMail               = this.sendMail.bind(this);
  }

  //-------PRODUCT THUMBNAIL-------
  ProductThumbnail(props){
      return (
        <div className={"productThumbnailContainer"}>
          <div className={"removeButtonAntiScroll"} >
            <button className={"secondaryButton deleteThumbnail"}
                    type={"button"}
                    onClick={() => {
                      props.removeProductFromCart(props.productID,props.removeProductFromCart)}}>
              {texts.delete}</button>
          </div>
          <img className={"productThumbImage"} alt={"product"} src={props.productImageLink}/>
          <p className={"productThumbName"}>{props.productName}</p>
        </div>
      )
  }
  productThumbnailGenerator(productThumbnailData, removeFunction){
    return productThumbnailData.map((currentProductThumbnail) => <this.ProductThumbnail
      key={"productThumbKey"+currentProductThumbnail.productID}
      productID = {currentProductThumbnail.productID}
      productName = {currentProductThumbnail.productName}
      productImageLink = {currentProductThumbnail.productImageLink}
      removeProductFromCart={removeFunction}
    />)
  }

  //-------MODAL WINDOW-------
  onOpenModal(){
    this.setState({ modalOpen: true });
  };
  onCloseModal(){
    this.setState({ modalOpen: false });
  };
  onCustomerNameChange = (event) => {
    this.setState({customerName: event.target.value});
  };
  onCustomerEmailChange = (event) => {
    this.setState({customerEmail: event.target.value});
  };

  sendMail(name, email){

    let html =
      `<table style="background-color: #e9e9e5; padding: 10px; width: 600px; border-radius: 10px;">`+
        `<tr align="center">`+
          `<div style="background-color: #ff9900; padding: 10px; border-radius: 10px; margin-bottom: 10px">` +
            `<h1 style="color: #443d34; font-weight: bold;">OBJEDNÁVKA OD: ${name}</h1>`+
            `<h2 style="color: #443d34;">email: ${email}</h2></th>`+
          `</div>`;
            html = html + this.props.productsInCart.map((product) => `<div style="align: center; border-radius: 5px; background-color: #cdbda4;width: 250px;height: 200px;padding: 5px"><img alt="product" style="max-height: 160px; max-width: 250px; object-fit: scale-down;" src="${product.productImageLink}"><h4>${product.productName}</h4></div>`);
            html = html +
        `</tr>` +
      `</table>`
    ;

    fetch(constants.endpoint + '/sendOrder',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.customerName,
          email: this.state.customerEmail,
          html: html
        })
      }
    )
      .then(res => console.log("mail sent"));
  }

  render() {
    return (
      <div className={"cartPanelContainer"}>
        <Modal
          open={this.state.modalOpen}
          onClose={this.onCloseModal}
          center
          classNames={{modal: "customModal"}}
        >
          <h2>{texts.yourContact}</h2>
          <div>
            <p>{texts.yourName}</p>
            <input className={"adminConsoleProductName"}
                   type="text"
                   placeholder={texts.namePlaceholder}
                   onChange={this.onCustomerNameChange}/>
          </div>
          <div>
            <p>{texts.yourEmail}</p>
            <input className={"adminConsoleProductName"}
                   type="text"
                   placeholder={texts.emailPlaceholder}
                   onChange={this.onCustomerEmailChange}/>
          </div>
          <div className={"centerInModal"}>
            <button
              className={"primaryButton"}
              type={"button"}
              onClick={() => {this.sendMail(this.state.customerName,this.state.customerEmail)}}
            >{texts.send}</button>
          </div>
        </Modal>
        <div className={"cartPanelOrderedProducts"}>
          {this.productThumbnailGenerator(this.props.productsInCart, this.props.removeProductFromCart)}
        </div>
        <button
          className={"primaryButton"}
          type={"button"}
          onClick={this.onOpenModal}
        >{texts.orderInterest}</button>
      </div>
    )
  }
}

export default CartPanel;