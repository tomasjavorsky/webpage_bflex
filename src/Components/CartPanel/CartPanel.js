import React from 'react';
import './CartPanel.css';
import {constants, texts} from "../../strings";
import Modal from 'react-responsive-modal';

class CartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      smallModalOpen: false,
      customerName: "",
      customerEmail: "",
      customerNote: "",
      termsDocumentLink: "#",
    };

    this.onOpenModal            = this.onOpenModal.bind(this);
    this.onCloseModal           = this.onCloseModal.bind(this);
    this.onOpenSmallModal       = this.onOpenSmallModal.bind(this);
    this.onCloseSmallModal      = this.onCloseSmallModal.bind(this);
    this.onCustomerNameChange   = this.onCustomerNameChange.bind(this);
    this.onCustomerEmailChange  = this.onCustomerEmailChange.bind(this);
    this.onCustomerNoteChange   = this.onCustomerNoteChange.bind(this);
    this.sendMail               = this.sendMail.bind(this);
  }

  componentDidMount(){
      fetch(constants.endpoint+'/gdprText')
        .then(res => res.json())
        .then(res => this.setState({termsDocumentLink: res[0].file_link}))
        .catch(err => console.log(err));
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
  onOpenSmallModal(){
    this.setState({ smallModalOpen: true });
  };
  onCloseSmallModal(){
    this.setState({ smallModalOpen: false });
  };
  onCustomerNameChange = (event) => {
    this.setState({customerName: event.target.value});
  };
  onCustomerEmailChange = (event) => {
    this.setState({customerEmail: event.target.value});
  };
  onCustomerNoteChange = (event) => {
    this.setState({customerNote: event.target.value});
  };

  sendMail(name, email, note){

    let htmlToBflex =
      `<table style="background-color: #e9e9e5; padding: 10px; width: 600px; border-radius: 10px;">`+
        `<tr align="center">`+
          `<div style="background-color: #ff9900; padding: 10px; border-radius: 10px; margin-bottom: 10px">` +
            `<h1 style="color: #443d34; font-weight: bold;">OBJEDNÁVKA OD: ${name}</h1>`+
            `<h2 style="color: #443d34;">email: ${email}</h2>`;
            if(note !== ""){
              htmlToBflex = htmlToBflex +
              `<h2 style="color: #443d34;">poznámka:</h2>` +
              `<div>${note}</div>`;
            }
            htmlToBflex = htmlToBflex +
          `</div>`;
            htmlToBflex = htmlToBflex + this.props.productsInCart.map((product) => `<div style="align: center; border-radius: 5px; background-color: #bcbcb8; height: 200px; padding: 5px"><img alt="product" style="max-height: 160px; max-width: 250px; object-fit: scale-down;" src="${product.productImageLink}"><h4>${product.productName}</h4></div>`);
            htmlToBflex = htmlToBflex +
        `</tr>` +
      `</table>`
    ;

    let htmlToCustomer =
      `<table style="background-color: #e9e9e5; padding: 10px; width: 600px; border-radius: 10px;">`+
        `<tr align="center">`+
          `<div style="background-color: #ff9900; padding: 10px; border-radius: 10px; margin-bottom: 10px">` +
            `<h2 style="color: #443d34; font-weight: bold;">Vaša objednávka bola zaregistrovaná.</h2>`+
            `<h4 style="color: #443d34;">V najbližšej dobe Vás budeme kontaktovať.</h4>` +
            `<p style="color: #443d34;">Vaše vybraté produkty:</p>` +
          `</div>`;
        htmlToCustomer = htmlToCustomer + this.props.productsInCart.map((product) => `<div style="align: center; border-radius: 5px; background-color: #bcbcb8; height: 200px; padding: 5px"><img alt="product" style="max-height: 160px; max-width: 250px; object-fit: scale-down;" src="${product.productImageLink}"><h4>${product.productName}</h4></div>`);
        htmlToCustomer = htmlToCustomer +
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
          htmlToBflex: htmlToBflex,
          htmlToCustomer: htmlToCustomer
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
                   type="email"
                   placeholder={texts.emailPlaceholder}
                   onChange={this.onCustomerEmailChange}/>
          </div>
          <div>
            <p>{texts.note}</p>
            <textarea className={"adminConsoleTableRows"}
                      rows="8" cols="35"
                      onChange={this.onCustomerNoteChange}/>
          </div>
          <div className={"youAcceptText centerInModal"}>
            {texts.youAcceptTerms}
            <a className={"textLink"} href={this.state.termsDocumentLink} target="_blank" rel="noopener noreferrer">{texts.terms}</a>
          </div>
          

          <div className={"centerInModal"}>
            <button
              className={"primaryButton"}
              type={"button"}
              onClick={() => {
                if(this.state.customerName !== "" && this.state.customerEmail !== ""){
                  this.sendMail(this.state.customerName,this.state.customerEmail,this.state.customerNote);
                  this.onCloseModal();
                  this.onOpenSmallModal();
                }
              }}
            >{texts.send}</button>
          </div>

        </Modal>
        <Modal
          open={this.state.smallModalOpen}
          onClose={this.onCloseSmallModal}
          center
          classNames={{modal: "customModal"}}
        >
          <h3 className={"sentText"}>{texts.sent}</h3>
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