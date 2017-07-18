const incrementCounter = (counterID) => ({
	type: 'INCREMENT_COUNTER',
	payload: {
		counterID: counterID
	}
});

const addCounter = () => ({
	type: 'ADD_COUNTER'
});


export { incrementCounter, addCounter };