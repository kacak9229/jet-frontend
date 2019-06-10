import React, { Component } from "react";
import logo from "./logo.svg";
import ProductList from "./components/Products/ProductList";
import ProductModal from "./components/Products/ProductModal";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.server = "http://localhost:7000";

    this.state = {
      products: []
    };

    // this.fetchproducts = this.fetchproducts.bind(this);
    this.handleProductAdded = this.handleProductAdded.bind(this);
    this.handleProductUpdated = this.handleProductUpdated.bind(this);
    this.handleProductDeleted = this.handleProductDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  //Fetch data from the back-end
  fetchProducts() {
    axios
      .get(`${this.server}/api/products/`)
      .then(response => {
        this.setState({ products: response.data.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ products: [] });
      });
  }

  handleProductAdded(product) {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products: products });
    console.log(products);
  }

  handleProductUpdated(product) {
    let products = this.state.products.slice();
    for (let i = 0, n = products.length; i < n; i++) {
      if (products[i]._id === product._id) {
        products[i].title = product.title;
        products[i].price = product.price;
        products[i].description = product.description;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ products: products });
  }

  handleProductDeleted(product) {
    let products = this.state.products.slice();
    products = products.filter(u => {
      return u._id !== product._id;
    });
    this.setState({ products: products });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Jet Stack <code> Node.js, React, Webpack </code> .
          </p>

          <p className="lead">Product Inventory</p>
        </header>

        <div className="container">
          <ProductModal
            server={this.server}
            buttonColor="primary"
            buttonText="Add a new Product"
            products={this.state.products}
            onProductAdded={this.handleProductAdded}
          />
          <hr />
          <ProductList
            server={this.server}
            onProductUpdated={this.handleProductUpdated}
            onProductDeleted={this.handleProductDeleted}
            products={this.state.products}
          />
        </div>
      </div>
    );
  }
}

export default App;
