import React from 'react';
import PropTypes from 'prop-types'

const FetchCountersButton = ({onClick, isFetching}) => {
	if(!isFetching) {
		return(<div><button onClick={onClick}>Fetch Counters</button></div>);
	} else {
		return(<div><button disabled>Fetch Counters</button>  ... fetching ... please wait a bit!</div>);
	}
};

FetchCountersButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default FetchCountersButton;