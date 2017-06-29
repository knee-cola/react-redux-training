const counterReducer = (state= {
		counters:[
			{counterID:'A',count:0},
			{counterID:'B',count:0},
			{counterID:'C',count:0}
		],
		activeIx: 0},
	action) => {
	
	switch(action.type) {
		case 'INCREMENT_COUNTER':
			state = Object.assign({}, state,
				{
					counters: [
						... state.counters.slice(0, state.activeIx),
						Object.assign({}, state.counters[state.activeIx], { count : state.counters[state.activeIx].count+1 }),
						... state.counters.slice(state.activeIx+1)
					]
				});
			return(state);
			break;
		case 'SET_ACTIVE_COUNTER':
			let activeIx = state.counters.reduce((accumulator, el, ix)=> { if(action.counterID===el.counterID) { console.log('counterID='+el.counterID); return(ix); } return(accumulator); }, -1);
			return(Object.assign({}, state, { activeIx: activeIx }));
			break;
		default:
			return(state);
	};
};

export default counterReducer;