import React from 'react';
import './CartPanel.css';
import {texts} from "../../strings";
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
  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };
  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };
  onCustomerNameChange = (event) => {
    this.setState({customerName: event.target.value});
  }
  onCustomerEmailChange = (event) => {
    this.setState({customerEmail: event.target.value});
  };


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
              onClick={""}
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