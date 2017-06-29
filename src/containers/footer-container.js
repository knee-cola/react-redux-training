import { connect } from 'react-redux'
import * as Actions from '../actions'
import Footer from '../components/footer'

const mapStateToProps = (state, ownProps) => ({
	counters: state.counters
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);