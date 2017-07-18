import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const AddLink = ({onClick}) => (
<a href="#" onClick={e => { e.preventDefault(); onClick(); }}>Add (+)</a>);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
		dispatch(Actions.addCounter());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLink);