import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { listProducts: [], query: '', searches: 0 };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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

    return (
      <div>
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
          listProducts.map(({ id, price, title, thumbnail }) => (
            <div data-testid="product" key={ id }>
              <img src={ thumbnail } alt={ title } />
              <span>{ title }</span>
              <span>{ price }</span>
            </div>
          ))
        ) }
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
      </div>
    );
  }
}

export default Search;
