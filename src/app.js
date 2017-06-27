// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div></div>,
	document.getElementById('root'));