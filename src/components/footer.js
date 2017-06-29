import React from 'react';
import PropTypes from 'prop-types'
import FooterLink from '../containers/link-container';

const Footer = ({counters}) => (
  <p>
    Show:
    {
		counters.map(el=> <FooterLink key={el.counterID} {...el}>{el.counterID}</FooterLink> )
	}
  </p>
)

Footer.propTypes = {
  counters: PropTypes.array.isRequired
}


export default Footer