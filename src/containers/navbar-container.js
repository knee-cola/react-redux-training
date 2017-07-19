import React from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'
import NavBar from '../components/navbar'

const mapStateToProps = (state, ownProps) => ({
	// we don't call [toJS] method here, since it would
	// make component re-render each time something unrelated
	// changes in the state (due to it returning a new Array each time)
	// ... this is done "lazy" in the [ComponentWrapper]
	counters: state.get('counters'),
	activeCounterId: ownProps.match.params.counterId
})

const ComponentWrapper = function(props) {
	// convert the immutable List to plain Array
	// ... this is done here at the point when it's decided that
	// the component needs to be re-rendered ... at this stage
	// calling [toJS] doens't hurt
	return(<NavBar {...props} counters={props.counters.toJS()} />);
};

const mapDispatchToProps = (dispatch, ownProps) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);