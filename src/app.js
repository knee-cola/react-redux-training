// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './reducers';
import CounterButton from './components/counter-button';

const store = createStore(counterReducer);

ReactDOM.render(
	<Provider store={store}>
		<CounterButton />
	</Provider>,
	document.getElementById('root'));