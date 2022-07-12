import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartElement extends React.Component {

  // componentDidMount() {
  //   const { match: { params: { id } } } = this.props;
  //   const { location: { search } } = this.props;
  //   this.fetchProduct(id, search);
  // }
  componentDidMount() {
    const { cart.length } = 
    cthis.setState(this.loadCartLenght)
  }

  loadCartLenght = () => {
    localStorage.getItem('amount');
  }

  cartLenght = () => {
    localStorage.setItem('amount', cart.length);
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
          <p data-testid="shopping-cart-size">
            { cart.length }
            {/* ou { this.pensarEmUmaFuncao } */}
          </p>
        </Link>
      </div>
    );
  }
}

CartElement.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default CartElement;
