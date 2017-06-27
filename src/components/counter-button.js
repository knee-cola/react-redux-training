import React from 'react';
import ReactDOM from 'react-dom';

export default class CounterButton extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
		  count:0
		};
	}

	render() {
		return(<button onClick={this.handleClick.bind(this)}>{this.props.label}={this.state.count}</button>);
	}
	
	handleClick() {
		this.setState({count:this.state.count+1});
	}
}