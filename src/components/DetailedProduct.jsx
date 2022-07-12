import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Form from './Form';
import Evaluation from './Evaluation';

/* import PropTypes from 'prop-types'; */

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
      getEvaluations,
    } = this.props;
    const { productDetail } = this.state;
    this.fetchProduct(id, search);
    this.setState({ evaluations: getEvaluations(productDetail.id) });
  }

  componentWillUnmount() {
    const { evaluations } = this.state;
    const { setEvaluations } = this.props;
    setEvaluations(evaluations);
  }

    fetchProduct = async (id, title) => {
      const { results } = await getProductsFromCategoryAndQuery('', title);
      const product = results.find((result) => result.id === id);
      this.setState({
        productDetail: product,
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { email, rating, textarea } = this.state;
      this.setState(({ evaluations }) => (
        { evaluations: [...evaluations, { email, rating, textarea }] }));
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
  getEvaluations: PropTypes.func.isRequired,
  setEvaluations: PropTypes.func.isRequired,
};

export default DetailedProduct;
