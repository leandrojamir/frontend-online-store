import React from 'react';
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

  return (
    <aside>
      {categoryList.map((element) => (
        <button data-testid="category" key={ element.id } type="button">
          {element.name}
        </button>)) }
    </aside>
  );
}
}

export default Category;
