import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, count, onClick }) => {
  if (active) {
    return <span>{children}({count})</span>
  }

  return (
    <a href="#" onClick={e => {
        e.preventDefault()
        onClick()
		}}>{children}({count})</a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link