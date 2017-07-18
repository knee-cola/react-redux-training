import React from 'react'

import IncrementButton from './containers/increment-button-container';
import NavBar from './containers/navbar-container';

const App = (params) => (<div>
		<NavBar {...params} />
		<IncrementButton {...params} />
	</div>);

export default App;