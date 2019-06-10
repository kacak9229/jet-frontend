import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      price: "",
      description: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const product = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description
    };
    if (this.props.buttonText === "Update") {
      this.props.onProductUpdated(product);
      axios({
        method: "put",
        responseType: "json",
        url: `${this.props.server}/api/products/${this.props.productID}`,
        data: product
      }).then(response => {
        this.props.onProductUpdated(response.data.data);
      });
    } else if (this.props.buttonText === "Add a new Product") {
      axios({
        method: "post",
        responseType: "json",
        url: `${this.props.server}/api/products`,
        data: product
      }).then(response => {
        this.props.onProductAdded(response.data.data);
      });
    }

    this.setState({
      title: "",
      price: "",
      description: ""
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label> Product Title </Form.Label>
          <Form.Control
            type="text"
            placeholder="Iphone X..."
            name="title"
            defaultValue={this.state.title}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label> Price </Form.Label>
          <Form.Control
            type="text"
            placeholder="5999"
            name="price"
            defaultValue={this.state.price}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label> Product Description </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Sleek design and powerful"
            name="description"
            defaultValue={this.state.description}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Button variant={this.props.buttonColor} size="lg" type="submit">
          {this.props.buttonText}
        </Button>
      </Form>
    );
  }
}

export default ProductForm;
