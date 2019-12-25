import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Select = withTheme(props => {
  const { theme, children, style, ...args } = props

  return (
    <select
      { ...args }
      style={ theme.join(get(theme, ['form', 'select' ]), style) }
    >
      { children }
    </select>
  )
})

Select.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
}
