import {Map, List} from 'immutable';

const counterReducer = (state = Map({
			counters: List(),
			isFetching: false
		}),
		action) => {
	
	const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','W'];
	let counters = state.get('counters'),
		newCounters;
	
	switch(action.type) {
		case 'INCREMENT_COUNTER':

			let activeCounterID = action.payload.counterID;
			
			newCounters = counters.map(el => {

				if(el.get('counterID')===activeCounterID) {
				// IF we're looking at the counter which needs to be changed
				// > increment it's value and return the new instance
					return( el.set('count', el.get('count')+1) );
				}

				return(el); // just return the previous instance
			});

			return(state.set('counters', newCounters));

		case 'ADD_COUNTER':

			newCounters = counters.push(
				Map({ counterID:letters[counters.count()],count:0 })
			);

			return(state.set('counters', newCounters));

		case 'FETCH_COUNTERS_REQUEST':
			return(state.set('isFetching', true));

		case 'FETCH_COUNTERS_SUCCESS':

			let i = counters.count();

			// converting data received over wire to [Map] object + adding [counterID]
			newCounters = action.payload.counters.map(el => Map({
				counterID:letters[i++],
				count:el.count
			}));

			return(state
					.set('counters', counters.concat(newCounters))
					.set('isFetching', false));
		default:
			return(state);
	};
};

export default counterReducer;