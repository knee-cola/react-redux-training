import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incrementCounter } from '../actions'
import IncrementButton from '../components/increment-button'

const mapStateToProps = (state, ownProps) => {

	let activeCounterId = ownProps.match.params.counterId;

	if(activeCounterId===void 0) {
		return({counterID:'', count:0});
	}

	return(state.counters.filter(el=>el.counterID ===activeCounterId)[0]);
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(incrementCounter(ownProps.match.params.counterId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncrementButton);