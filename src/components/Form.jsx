import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Form extends React.Component {
  render() {
    const { handleChange, handleSubmit, handleRating } = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <label htmlFor="product-detail-email">
          <input
            type="email"
            data-testid="product-detail-email"
            id="product-detail-email"
            onChange={ handleChange }
            name="email"
          />
        </label>
        <input
          type="checkbox"
          className="star-icon"
          data-testid="1-rating"
          onChange={ handleRating }
          name="1"
        />
        <input
          type="checkbox"
          className="star-icon"
          data-testid="2-rating"
          onChange={ handleRating }
          name="2"
        />
        <input
          type="checkbox"
          className="star-icon"
          data-testid="3-rating"
          onChange={ handleRating }
          name="3"
        />
        <input
          type="checkbox"
          className="star-icon"
          data-testid="4-rating"
          onChange={ handleRating }
          name="4"
        />
        <input
          type="checkbox"
          className="star-icon"
          data-testid="5-rating"
          onChange={ handleRating }
          name="5"
        />
        {/* <ul className="evaluation">
          <li className="star-icon selected" data-evaluation="1" />
          <li className="star-icon" data-evaluation="2" />
          <li className="star-icon" data-evaluation="3" />
          <li className="star-icon" data-evaluation="4" />
          <li className="star-icon" data-evaluation="5" />
        </ul> */}
        <label htmlFor="product-detail-evaluation">
          <textarea
            data-testid="product-detail-evaluation"
            id="product-detail-evaluation"
            name="textarea"
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="submit-review-btn"
        >
          Enviar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRating: PropTypes.func.isRequired,
};

export default Form;
