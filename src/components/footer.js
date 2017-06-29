import React from 'react';
import PropTypes from 'prop-types'
import FooterLink from '../containers/link-container';
import AddLink from '../components/add-link';

const Footer = ({counters}) => (
  <p>
    {
		counters.map(el=> <FooterLink key={el.counterID} {...el}>{el.counterID}</FooterLink> )
	}
	<AddLink/>
  </p>
)

Footer.propTypes = {
  counters: PropTypes.array.isRequired
}


export default Footer