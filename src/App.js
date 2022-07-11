import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Search from './components/search';
import ShoppingCart from './components/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';
import DetailedProduct from './components/DetailedProduct';

class App extends React.Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  addToCart = async ({ title, id }) => {
    const { results } = await getProductsFromCategoryAndQuery('', title);
    const product = results.find((result) => result.id === id);
    this.setState(({ cart }) => ({ cart: [...cart, product] }));
  }

  render() {
    const { cart } = this.state;

    return (
      <BrowserRouter>
        <Route exact path="/" render={ () => <Search addToCart={ this.addToCart } /> } />
        <Route path="/cart" render={ () => <ShoppingCart cart={ cart } /> } />
        <Route path="/detailedProduct/:id" component={ DetailedProduct } />
      </BrowserRouter>
    );
  }
}

export default App;
