import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Search from './components/search';
import ShoppingCart from './components/ShoppingCart';
// import { getProductsFromCategoryAndQuery } from './services/api';
import DetailedProduct from './components/DetailedProduct';
import Checkout from './components/checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  addToCart = async (prod) => {
    this.setState(({ cart }) => ({ cart: [...cart, prod] }));
  }

  removeCart = (id) => {
    const { cart } = this.state;
    const index = cart.reverse().findIndex((product) => product.id === id);
    const removeProduct = cart.splice(index, 1);
    const newCart = cart.filter((product) => product !== removeProduct);
    this.setState({ cart: newCart });
  }

  render() {
    const { cart } = this.state;

    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ () => (<Search
            addToCart={ this.addToCart }
            cart={ cart }
          />) }
        />
        <Route
          path="/cart"
          render={ () => (<ShoppingCart
            cart={ cart }
            addToCart={ this.addToCart }
            removeCart={ this.removeCart }
          />) }
        />
        <Route
          path="/detailedProduct/:id"
          render={ (props) => (<DetailedProduct
            { ...props }
            addToCart={ this.addToCart }
<<<<<<< HEAD
            cart={ cart }
=======
            setEvaluations={ this.setEvaluations }
            getEvaluations={ this.getEvaluations }
>>>>>>> main-group-18
          />) }
        />
        <Route
          path="/Checkout"
          component={ Checkout }
        />
      </BrowserRouter>
    );
  }
}

export default App;
