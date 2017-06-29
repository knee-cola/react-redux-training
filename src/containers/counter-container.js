import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incrementCounter } from '../actions'
import Counter from '../components/counter'

const mapStateToProps = state => {
  return Object.assign({}, state.counters[state.activeIx]);
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(incrementCounter())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);