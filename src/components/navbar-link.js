import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const NavbarLink = ({ active, children, count, onClick, counterID }) => {
  if (active) {
    return <span>{counterID}({count})</span>
  }

  return(<Link to={BASE_URL+counterID+"/"}>{counterID}({count})</Link>);
}

NavbarLink.propTypes = {
  active: PropTypes.bool.isRequired,
  counterID: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default NavbarLink