// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import CounterButton from './components/counter-button';

ReactDOM.render(
	<div>
		<CounterButton label="A" />
	</div>,
	document.getElementById('root'));

console.log(123);