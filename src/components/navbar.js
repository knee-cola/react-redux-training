import React from 'react';
import PropTypes from 'prop-types'
import NavbarLink from '../containers/navbar-link-container';
import AddLink from './add-link';

const NavBar = ({counters, activeCounterId}) => (
  <p>
	<AddLink/>
    {
		counters.map(el=> <NavbarLink key={el.counterID} {...el} activeCounterId={activeCounterId} /> )
	}
  </p>
)

NavBar.propTypes = {
  counters: PropTypes.array.isRequired
}

export default NavBar