import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

/* import PropTypes from 'prop-types'; */

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetail: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { location: { search } } = this.props;
    this.fetchProduct(id, search);
  }

    fetchProduct = async (id, title) => {
      const { results } = await getProductsFromCategoryAndQuery('', title);
      const product = results.find((result) => result.id === id);
      this.setState({
        productDetail: product,
      });
    }

    render() {
      const { productDetail } = this.state;
      console.log(productDetail);
      return (
        <section>
          <h1 data-testid="product-detail-name">
            {productDetail.title}
          </h1>
          <p>{productDetail.price}</p>
          <img src={ productDetail.thumbnail } alt={ productDetail.title } />

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
};

export default DetailedProduct;
