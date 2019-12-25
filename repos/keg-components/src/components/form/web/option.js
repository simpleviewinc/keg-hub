import React from 'react'
import { withTheme } from 're-theme'
import PropTypes from 'prop-types'

export const Option = withTheme(props => {
  const { theme, children, label, text, style, ...args } = props

  return (
    <option { ...args }>
      { children || label || text }
    </option>
  )
})

Option.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
}
