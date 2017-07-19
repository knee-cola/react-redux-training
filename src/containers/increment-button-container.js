import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incrementCounter } from '../actions'
import IncrementButton from '../components/increment-button'

const mapStateToProps = (state, ownProps) => {

  let activeCounterId = ownProps.match.params.counterId;

  if(activeCounterId===void 0) {
  // IF no counter has been selected
  // > return the dummy object - the button will not be drawn
		return({
      counterID: null
    });
  }

  // Here we don't need to wory about converting the Immutable object to
  // plain JavaScript object (calling [toJS] function) since the only
  // property which is returned is of BASIC data-type (string),
  // meaning that the shallow comparison will not yield a false-positive result
  // ... that can happen only with refference-types (i.e. objects, arrays)
	return({
    counterID: state.get('counters').find(el=>el.get('counterID')===activeCounterId).get('counterID')
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(incrementCounter(ownProps.match.params.counterId));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncrementButton);