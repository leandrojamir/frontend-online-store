import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CartElement from './CartElement';
import Form from './Form';
import Evaluation from './Evaluation';

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetail: {},
      evaluations: [],
      email: '',
      rating: '0',
      textarea: '',
    };
  }

  componentDidMount() {
    const {
      match: { params: { id } },
      location: { search },
    } = this.props;
    this.fetchProduct(id, search);
    const evaluations = JSON.parse(localStorage.getItem(`${id}evaluations`));
    if (evaluations) {
      this.setState({ evaluations });
    }
  }

    fetchProduct = async (id, title) => {
      const { results } = await getProductsFromCategoryAndQuery('', title);
      const product = results.find((result) => result.id === id);
      this.setState({
        productDetail: product,
      });
    }

    setEvaluations = () => {
      const { evaluations, productDetail: { id } } = this.state;
      localStorage.setItem(`${id}evaluations`, JSON.stringify(evaluations));
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { email, rating, textarea } = this.state;
      this.setState(({ evaluations }) => (
        { evaluations: [...evaluations, { email, rating, textarea }] }),
      async () => { await this.setEvaluations(); });
    }

    handleChange = ({ target }) => {
      const { name } = target;
      const value = (target.type === 'checkbox') ? target.checked : target.value;
      this.setState({ [name]: value });
    }

    handleRating = ({ target }) => {
      const { name } = target;
      this.setState({ rating: name });
    }

    render() {
      const { productDetail: { title, thumbnail, id, price }, evaluations } = this.state;
      const { addToCart, cart } = this.props;

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
          <CartElement cart={ cart } />
          <Form
            handleChange={ this.handleChange }
            handleSubmit={ this.handleSubmit }
            handleRating={ this.handleRating }
          />
          { evaluations.map(({ email, rating, textarea }) => (
            <Evaluation
              key={ email }
              email={ email }
              rating={ rating }
              textarea={ textarea }
            />
          )) }
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
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default DetailedProduct;
