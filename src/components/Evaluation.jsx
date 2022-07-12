import React from 'react';
import PropTypes from 'prop-types';

class Evaluation extends React.Component {
  render() {
    const { email, rating, textarea } = this.props;
    return (
      <>
        <p>{ email }</p>
        <p>{ rating }</p>
        <p>{ textarea }</p>
      </>
    );
  }
}

Evaluation.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  textarea: PropTypes.string.isRequired,
};

export default Evaluation;
