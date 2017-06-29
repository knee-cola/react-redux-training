import React from 'react';
import PropTypes from 'prop-types'

const Counter = ({onClick, counterID, count}) => {
	if(counterID!=='') {
		return(<button onClick={onClick}>{counterID}++</button>);
	} else {
		return(null);
	}
};

Counter.propTypes = {
  onClick: PropTypes.func.isRequired,
  counterID: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired 
};

export default Counter;