import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Category from './category';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      // listCategory: [],
      query: '',
      searches: 0,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async ({ target }) => {
    const { results } = await getProductsFromCategoryAndQuery(target.id, '');
    this.setState(({ searches }) => ({
      listProducts: results,
      searches: searches + 1,
    }));
  }

  fetchProducts = async () => {
    const { query } = this.state;
    const { results } = await getProductsFromCategoryAndQuery('', query);
    this.setState(({ searches }) => ({
      listProducts: results,
      searches: searches + 1,
    }));
  }

  render() {
    const { listProducts, searches } = this.state;
    const { addToCart } = this.props;

    return (
      <div>
        <Category handleClick={ this.handleClick } />
        <input data-testid="query-input" name="query" onChange={ this.handleChange } />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.fetchProducts }
        >
          Pesquisar
        </button>
        { listProducts.length === 0 && searches === 0 && (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>) }
        { listProducts.length === 0 && searches !== 0 && (
          <h1>Nenhum produto foi encontrado</h1>) }
        { listProducts.length > 0 && (
          listProducts.map((prod) => {
            const { id, price, title, thumbnail, shipping } = prod;
            return (
              <div key={ id }>
                <Link
                  data-testid="product-detail-link"
                  to={ {
                    pathname: `/detailedProduct/${id}`,
                    search: title,
                  } }
                >
                  <div data-testid="product">
                    <img src={ thumbnail } alt={ title } />
                    <span>{ title }</span>
                    <span>{ price }</span>
                    { (shipping.free_shipping) && (
                      <span data-testid="free-shipping">Frete Grátis</span>) }
                  </div>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => addToCart(prod) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            );
          })
        ) }
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
      </div>
    );
  }
}

Search.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Search;
