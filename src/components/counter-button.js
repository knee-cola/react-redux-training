import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import incrementCounter from '../actions'

const CounterButton = ({onClick, label, count}) => (
	<button onClick={onClick}>{label}={count}</button>
);

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired 
}

const mapStateToProps = state => {
  return {
    label: state.label,
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: id => {
      dispatch(incrementCounter())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterButton);