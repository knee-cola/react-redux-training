import { connect } from 'react-redux'
import * as Actions from '../actions'
import FooterLink from '../components/navbar-link'

const mapStateToProps = (state, ownProps) => {

	return({
		active: ownProps.counterID === ownProps.activeCounterId,
		count: ownProps.count
	})
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
		dispatch(Actions.setActiveCounter(ownProps.counterID));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterLink);