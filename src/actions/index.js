const incrementCounter = () => ({
	type: 'INCREMENT_COUNTER'
});

const setActiveCounter = (counterID) => ({
	type: 'SET_ACTIVE_COUNTER',
	counterID: counterID
});

const addCounter = () => ({
	type: 'ADD_COUNTER'
});


export { incrementCounter, setActiveCounter, addCounter };