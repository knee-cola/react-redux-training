import { connect } from 'react-redux'
import * as Actions from '../actions'
import Link from '../components/link'

const mapStateToProps = (state, ownProps) => ({
	active: ownProps.counterID === state.counters[state.activeIx].counterID,
	count: ownProps.count
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
		dispatch(Actions.setActiveCounter(ownProps.counterID));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);