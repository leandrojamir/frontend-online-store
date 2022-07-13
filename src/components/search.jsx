import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Category from './category';
import CartElement from './CartElement';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
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

  comparePrices = (a, b, option) => {
    const down = -1;
    const up = 1;
    const sortDown = (option === 'Menor preço') ? down : up;
    const sortUp = (option !== 'Maior preço') ? up : down;
    if (a.price < b.price) {
      return sortDown;
    }
    if (a.price > b.price) {
      return sortUp;
    } return 0;
  }

  sortPrice = ({ target: { value } }) => {
    const { listProducts } = this.state;
    const option = value;
    const sortedList = listProducts.sort((a, b) => this.comparePrices(a, b, option));
    this.setState({ listProducts: sortedList });
  }

  render() {
    const { listProducts, searches } = this.state;
    const { addToCart, cart } = this.props;

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
        <label htmlFor="price-sorter">
          Ordenar por
          {' '}
          <select id="price-sorter" onChange={ this.sortPrice }>
            <option>Menor preço</option>
            <option>Maior preço</option>
          </select>
        </label>

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
        <CartElement cart={ cart } />
      </div>
    );
  }
}

Search.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Search;
