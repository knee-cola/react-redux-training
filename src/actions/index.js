import fetch from 'isomorphic-fetch';

const incrementCounter = (counterID) => ({
	type: 'INCREMENT_COUNTER',
	payload: {
		counterID: counterID
	}
});

const addCounter = () => ({
	type: 'ADD_COUNTER'
});

const requestCounters = () => ({
	type: 'FETCH_COUNTERS_REQUEST'
});

// this is an async operations - this is a THUNK Action Creator (=function which returns a function)
const fetchCounters = () => (dispatch) => {

	// dispatching action, which will result in [isFetching] flag be set to TRUE
	dispatch(requestCounters());

	// returning a promise created by calling [fetch]
	return fetch(require('../fetchCounters.ashx'))
		// converting response to JSON
		.then(response => response.json())
		// dispatching an action (and using the json)
		.then(json=>dispatch(receiveCounters(json)));
};

const receiveCounters = (payload) => ({
	type: 'FETCH_COUNTERS_SUCCESS',
	payload: payload
});

export { incrementCounter, addCounter, fetchCounters };