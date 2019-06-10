import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ProductForm from "./ProductForm";

class ProductModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button variant={this.props.buttonColor} onClick={this.handleShow}>
          {this.props.buttonText}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {this.props.buttonText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductForm
              productID={this.props.productID}
              server={this.props.server}
              buttonText={this.props.buttonText}
              buttonColor={this.props.buttonColor}
              onProductUpdated={this.props.onProductUpdated}
              onProductAdded={this.props.onProductAdded}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;
