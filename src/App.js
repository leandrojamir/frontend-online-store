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
    this.state = { cart: [], evaluations: [] };
  }

  addToCart = async (prod) => {
    // const { results } = await getProductsFromCategoryAndQuery('', title);
    // const product = results.find((result) => result.id === id);
    this.setState(({ cart }) => ({ cart: [...cart, prod] }));
  }

  removeCart = (id) => {
    const { cart } = this.state;
    // Tá sendo apagado o primeiro item do array, de forma que uma hora ele inverte a ordem dos itens na tela
    // Tendando usar reverse para inverter a ordem quando criar o index e assim apagar o ultimo item do array
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
    const index = cart.reverse().findIndex((product) => product.id === id);
    const removeProduct = cart.splice(index, 1);
    const newCart = cart.filter((product) => product !== removeProduct);
    this.setState({ cart: newCart });
  }

  setEvaluations = (newEval) => {
    this.setState((prevState) => (
      { evaluations: [...prevState.evaluations, ...newEval] }));
  }

  getEvaluations = (id) => {
    const { evaluations } = this.state;
    const filterId = evaluations.filter((evaluation) => evaluation.id === id);
    return filterId;
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
            setEvaluations={ this.setEvaluations }
            getEvaluations={ this.getEvaluations }
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
