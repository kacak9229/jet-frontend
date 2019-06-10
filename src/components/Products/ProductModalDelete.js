import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class ProductModalDelete extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit(e) {
    axios({
      method: "delete",
      responseType: "json",
      url: `${this.props.server}/api/products/${this.props.productID}`
    })
      .then(response => {
        this.handleClose();
        this.props.onProductDeleted(this.props.product);
      })
      .catch(err => {
        this.handleClose();
        throw err;
      });
  }

  render() {
    return (
      <div>
        <Button variant="danger" onClick={this.handleShow}>
          Delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <p>
                Are you sure you want to delete{" "}
                <strong>{this.props.product.title}</strong>?
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={this.handleSubmit}
              data-productid={this.props.product._id}
              color="red"
            >
              Yes
            </Button>
            <span> </span>
            <Button onClick={this.handleClose} color="black">
              No
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProductModalDelete;
