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

  // removeCart = ({ id }) => {
  //   const { cart } = this.state;
  //   // if (cart.filter((element) => element.id === id).length === 1) {
  //     return '';
  //   }
  //   const index = cart.reverse().findIndex((item) => item.id === id);
  //   cart.splice(index, 1);
  //   cart.reverse();
  //   this.setState({
  //     cart,
  //   });
  // }

  // https://www.delftstack.com/pt/howto/javascript/javascript-remove-object-from-array/#:~:text='Anna'%7D%5D-,Use%20o%20m%C3%A9todo%20filter()%20para%20remover%20um%20objeto%20de,fun%C3%A7%C3%A3o%20retornar%C3%A1%20um%20array%20vazio.

  //   var myArray = [{id:1, name:'Morty'},{id:2, name:'Rick'},{id:3, name:'Anna'}];
  // var newArray = myArray.filter((item) => item.id !== 1);
  // console.log(newArray);

  removeCart = ({ id }) => {
    const { cart } = this.state;
    const newCart = cart.filter((element) => element.id !== id);
    console.log(newCart);
    this.setState({ cart: newCart });
  }

  render() {
    const { cart } = this.state;

    return (
      <BrowserRouter>
        <Route exact path="/" render={ () => <Search addToCart={ this.addToCart } /> } />
        <Route
          path="/cart"
          render={ () => (
            <ShoppingCart
              cart={ cart }
              addToCart={ this.addToCart }
              removeCart={ this.removeCart }
            />) }
        />
        <Route path="/detailedProduct/:id" component={ DetailedProduct } />
      </BrowserRouter>
    );
  }
}

export default App;
