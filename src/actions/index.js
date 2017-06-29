const incrementCounter = () => ({
	type: 'INCREMENT_COUNTER'
});

const setActiveCounter = (counterID) => ({
	type: 'SET_ACTIVE_COUNTER',
	counterID: counterID
});

export { incrementCounter, setActiveCounter };