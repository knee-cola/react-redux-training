// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './reducers';
import Counter from './containers/counter-container';
import Footer from './containers/footer-container';

const store = createStore(counterReducer);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Counter />
			<Footer />
		</div>
	</Provider>,
	document.getElementById('root'));