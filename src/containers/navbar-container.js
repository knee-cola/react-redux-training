import { connect } from 'react-redux'
import * as Actions from '../actions'
import NavBar from '../components/navbar'

const mapStateToProps = (state, ownProps) => {

	return({
		counters: state.counters,
		activeCounterId: ownProps.match.params.counterId
	});
}

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);