import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Form from './Form';

/* import PropTypes from 'prop-types'; */

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetail: {},
      evaluation: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { location: { search } } = this.props;
    this.fetchProduct(id, search);
    this.getEvaluation();
  }

    fetchProduct = async (id, title) => {
      const { results } = await getProductsFromCategoryAndQuery('', title);
      const product = results.find((result) => result.id === id);
      this.setState({
        productDetail: product,
      });
    }

    getEvaluation = () => {
      const evaluation = JSON.parse(localStorage.getItem('evaluation'));
      this.setState({ evaluation });
    }

    render() {
      const { productDetail: { title, thumbnail, id, price }, evaluation } = this.state;
      const { addToCart } = this.props;
      /* console.log(title, thumbnail, id); */
      return (
        <section>
          <h1 data-testid="product-detail-name">
            {title}
          </h1>
          <p>{price}</p>
          <img src={ thumbnail } alt={ title } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => addToCart({ title, id }) }
          >
            Adicicionar ao Carrinho

          </button>
          <Link data-testid="shopping-cart-button" to="/cart">
            Carrinho
          </Link>
          <Form getEvaluation={ this.getEvaluation } />
          <div>
            <p>{ evaluation.email }</p>
            <p>{ evaluation.rating5 }</p>
            <p>{ evaluation.textarea }</p>
          </div>
        </section>
      );
    }
}
DetailedProduct.propTypes = {
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,
  location: PropTypes.objectOf(
    PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default DetailedProduct;
