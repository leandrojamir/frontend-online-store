import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { listProducts: [] };
  }

  render() {
    const { listProducts } = this.state;

    return (
      <div>
        <input />
        { listProducts.length > 0 ? <h1>teste</h1> : (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>) }
      </div>
    );
  }
}

export default Search;
