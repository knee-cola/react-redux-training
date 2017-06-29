const counterReducer = (state= {
		counters:[],
		activeIx: -1},
	action) => {
	
	const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','W'];
	
	switch(action.type) {
		case 'INCREMENT_COUNTER':
			return(Object.assign({}, state,
				{
					counters: [
						... state.counters.slice(0, state.activeIx),
						Object.assign({}, state.counters[state.activeIx], { count : state.counters[state.activeIx].count+1 }),
						... state.counters.slice(state.activeIx+1)
					]
				}));
			break;
		case 'ADD_COUNTER':
			return(Object.assign({}, state,
				{
					counters: [
						... state.counters.slice(0, state.counters.length),
						{ counterID:letters[state.counters.length],count:0 }
					],
					// set the new counter to be the active one
					activeIx: state.counters.length
				}));
			break;
		case 'SET_ACTIVE_COUNTER':
			let activeIx = state.counters.reduce((accumulator, el, ix)=> { if(action.counterID===el.counterID) { return(ix); } return(accumulator); }, -1);
			return(Object.assign({}, state, { activeIx: activeIx }));
			break;
		default:
			return(state);
	};
};

export default counterReducer;