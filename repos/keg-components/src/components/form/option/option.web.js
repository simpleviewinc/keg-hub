import React from 'react'
import PropTypes from 'prop-types'

export const Option = props => {
  const { children, label, style, text, value, ...args } = props

  return (
    <option
      {...args}
      value={value || label || text}
    >
      { label || value || text || children }
    </option>
  )
}

Option.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
}
