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

  render() {
    const { cart } = this.props;

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
          </div>
        ))
      )
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ShoppingCart;
