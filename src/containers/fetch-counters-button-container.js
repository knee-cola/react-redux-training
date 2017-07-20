import { connect } from 'react-redux'
import { fetchCounters } from '../actions'
import FetchCountersButton from '../components/fetch-counters-button'

const mapStateToProps = (state, ownProps) => {
	return({
		isFetching: state.get('isFetching')
	});
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(fetchCounters());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchCountersButton);