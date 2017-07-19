import {Map, List} from 'immutable';

const counterReducer = (state = Map({
			counters: List()
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

//		case 'SET_ACTIVE_COUNTER':
//			let activeIx = state.counters.reduce((accumulator, el, ix)=> { if(action.counterID===el.counterID) { return(ix); } return(accumulator); }, -1);
//			return(Object.assign({}, state, { activeIx: activeIx }));
//			break;
		default:
			return(state);
	};
};

export default counterReducer;