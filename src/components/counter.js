import React from 'react';
import PropTypes from 'prop-types'

const Counter = ({onClick, counterID, count}) => (
	<button onClick={onClick}>{counterID}={count}</button>
);

Counter.propTypes = {
  onClick: PropTypes.func.isRequired,
  counterID: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired 
};

export default Counter;