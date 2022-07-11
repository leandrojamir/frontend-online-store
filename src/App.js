import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Search from './components/search';
import ShoppingCart from './components/ShoppingCart';
// import { getProductsFromCategoryAndQuery } from './services/api';
import DetailedProduct from './components/DetailedProduct';

class App extends React.Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  addToCart = async (prod) => {
    // const { results } = await getProductsFromCategoryAndQuery('', title);
    // const product = results.find((result) => result.id === id);
    this.setState(({ cart }) => ({ cart: [...cart, prod] }));
  }

  removeCart = (id) => {
    const { cart } = this.state;
    const index = cart.findIndex((product) => product.id === id);
    const removeProduct = cart.splice(index, 1);
    const newCart = cart.filter((product) => product !== removeProduct);
    this.setState({ cart: newCart });
  }

  render() {
    const { cart } = this.state;

    return (
      <BrowserRouter>
        <Route exact path="/" render={ () => <Search addToCart={ this.addToCart } /> } />
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
          />) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
