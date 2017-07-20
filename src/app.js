import React from 'react'

import IncrementButton from './containers/increment-button-container';
import NavBar from './containers/navbar-container';
import FetchCountersButton from './containers/fetch-counters-button-container';

const App = (params) => (<div>
		<NavBar {...params} />
		<IncrementButton {...params} />
		<FetchCountersButton {...params} />
	</div>);

export default App;