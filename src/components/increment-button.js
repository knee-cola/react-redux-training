import React from 'react';
import PropTypes from 'prop-types'

const IncrementButton = ({onClick, counterID}) => {
	if(counterID!==null) {
		return(<button onClick={onClick}>{counterID}++</button>);
	} else {
		return(null);
	}
};

IncrementButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  counterID: PropTypes.string
};

export default IncrementButton;