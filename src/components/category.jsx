import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
    };
  }

  componentDidMount() {
    this.hendlerApi();
  }

hendlerApi = async () => {
  const result = await getCategories();
  this.setState({
    categoryList: result,
  });
}

render() {
  const { categoryList } = this.state;
  const { handleClick } = this.props;

  return (
    <aside>
      {categoryList.map((element) => (
        <button
          data-testid="category"
          key={ element.id }
          id={ element.id }
          type="button"
          onClick={ handleClick }
        >
          {element.name}
        </button>)) }
    </aside>
  );
}
}

Category.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Category;
