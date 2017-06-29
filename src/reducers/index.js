const counterReducer = (state={count:0, label:'A'}, action) => {
	switch(action.type) {
		case 'INCREMENT_COUNTER':
			return({
				count: state.count+=1,
				label: state.label
			});
			break;
		default:
			return(state);
	};
};

export default counterReducer;