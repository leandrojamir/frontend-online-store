import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartElement extends React.Component {
  // // componentDidMount() {
  // //   const {
  // //     match: { params: { id } },
  // //     location: { search },
  // //   } = this.props;
  // //   this.fetchProduct(id, search);
  // //   const evaluations = JSON.parse(localStorage.getItem(`${id}evaluations`));
  // //   if (evaluations) {
  // //     this.setState({ evaluations });
  // //   }
  // // }
  // // componentDidMount() {
  // //   this.cartLenght();
  // //   this.loadCartLenght();
  // // }

  // // loadCartLenght = () => {
  // //   localStorage.getItem('amount');
  // // }

  // // cartLenght = () => {
  // //   const { cart } = this.props;
  // //   const saveAmount = cart.length;
  // //   localStorage.setItem('amount', saveAmount);
  // //   console.log(saveAmount);
  // // }

  // componentDidMount() {
  //   this.cartLenght();
  // }

  // loadAmount = () => {
  //   const saveAmount = localStorage.getItem('amount');
  //   if (saveAmount !== null) {
  //     return saveAmount;
  //   }
  //   return 0;
  // }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
          <p data-testid="shopping-cart-size">
            { cart.length }
            {/* { this.cartLenght } */}
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
