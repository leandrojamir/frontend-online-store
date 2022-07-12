import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  countProducts = (id) => {
    const { cart } = this.props;
    const quantity = cart.filter((product) => product.id === id);
    return quantity.length;
  }

  productsInCart = () => {
    const { cart } = this.props;
    const ids = cart.map(({ id }) => id);
    const products = cart.filter((product, index) => ids.indexOf(product.id) === index);
    return products;
  }

  render() {
    const { cart, addToCart, removeCart } = this.props;
    const products = this.productsInCart();

    return (
      cart.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      ) : (
        products.map(({ title, id }) => (
          <>
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{ title }</p>
              <p data-testid="shopping-cart-product-quantity">
                { this.countProducts(id) }
              </p>
              <button
                onClick={ () => (addToCart({ title, id })) }
                id={ id }
                data-testid="product-increase-quantity"
                type="button"
              >
                +1
              </button>
              <button
                onClick={ () => (removeCart(id)) }
                id={ id }
                data-testid="product-decrease-quantity"
                type="button"
              >
                -1
              </button>
            <Link data-testid="checkout-products" to="/Checkout">
              finalizar  compra
            </Link>
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
  addToCart: PropTypes.func.isRequired,
  removeCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
