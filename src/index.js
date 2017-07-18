// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

import counterReducer from './reducers';
import App from './app';
import AddLink from './components/add-link';

const store = createStore(counterReducer);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Switch>
				<Route exact path={BASE_URL} component={App} />
				<Route path="/react-redux-training/dev/:counterId/" component={App} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root'));