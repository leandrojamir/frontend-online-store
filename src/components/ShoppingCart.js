import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  countProducts = (id) => {
    const { cart } = this.props;
    const quantity = cart.filter((product) => product.id === id);
    return quantity.length;
  }

  productsInCart = () => {
    const { cart } = this.props;
    const products = cart.reduce((acc, curr) => (
      (this.countProducts(curr.id) > 1) ? acc : [acc, curr]));
    return (products.length > 0) ? products : cart;
  }

  // exemplo const newState = state.filter((data) => data.id !== id)
  // se quebrar a pagina, comenta da linha 21 a 25 e alinha 43

  removeCart = () => {
    const { cart } = this.props;
    const products = cart.filter((data) => data.title !== title);
    return (products.length > 0) ? products : cart;
  }

  render() {
    const { cart, addToCart } = this.props;

    return (
      cart.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      ) : (
        this.productsInCart().map(({ title, id }) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">{ title }</p>
            <p data-testid="shopping-cart-product-quantity">
              { this.countProducts(id) }
            </p>
            <button
              onClick={ () => (removeCart({ title })) }
              id={ id }
              data-testid="product-decrease-quantity"
              type="button"
            >
              -1
            </button>
            <button
              onClick={ () => (addToCart({ title, id })) }
              id={ id }
              data-testid="product-increase-quantity"
              type="button"
            >
              +1
            </button>
          </div>
        ))
      )
    );
  }
}

ShoppingCart.propTypes = {
  // https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
