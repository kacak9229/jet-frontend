import React, { Component } from "react";
import { Table, Badge } from "react-bootstrap";
import ProductModal from "./ProductModal";
import ProductModalDelete from "./ProductModalDelete";

class ProductList extends Component {
  render() {
    let products = this.props.products;

    products = products.map(product => (
      <tr key={product.title}>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
          {" "}
          <h6>
            <span>
              <Badge variant="success">RM</Badge>
            </span>
            {product.price}
          </h6>
        </td>
        <td>
          <ProductModal
            server={this.props.server}
            productID={product._id}
            onProductUpdated={this.props.onProductUpdated}
            buttonColor="warning"
            buttonText="Update"
          />
        </td>
        <td>
          <ProductModalDelete
            server={this.props.server}
            productID={product._id}
            onProductDeleted={this.props.onProductDeleted}
            product={product}
          />
        </td>
      </tr>
    ));

    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Update Product</th>
            <th>Delete Product</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    );
  }
}

export default ProductList;
