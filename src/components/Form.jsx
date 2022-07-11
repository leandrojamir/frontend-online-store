import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
      textarea: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('evaluation', JSON.stringify(this.state));
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { getEvaluation } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="product-detail-email">
          <input
            type="email"
            data-testid="product-detail-email"
            id="product-detail-email"
            onChange={ this.handleChange }
            name="email"
          />
        </label>
        <input
          type="checkbox"
          data-testid="1-rating"
          onChange={ this.handleChange }
          name="rating1"
        />
        <input
          type="checkbox"
          data-testid="2-rating"
          onChange={ this.handleChange }
          name="rating2"
        />
        <input
          type="checkbox"
          data-testid="3-rating"
          onChange={ this.handleChange }
          name="rating3"
        />
        <input
          type="checkbox"
          data-testid="4-rating"
          onChange={ this.handleChange }
          name="rating4"
        />
        <input
          type="checkbox"
          data-testid="5-rating"
          onChange={ this.handleChange }
          name="rating5"
        />
        <label htmlFor="product-detail-evaluation">
          <textarea
            data-testid="product-detail-evaluation"
            id="product-detail-evaluation"
            name="textarea"
          />
        </label>
        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ getEvaluation }
        >
          Enviar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  getEvaluation: PropTypes.func.isRequired,
};

export default Form;
