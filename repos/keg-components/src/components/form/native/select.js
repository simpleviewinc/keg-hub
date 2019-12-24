import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Select = withTheme(props => {
  const { theme, children, ...args } = props
  const selectStyle = theme.join(get(theme, ['form', 'select' ]), style)
  
  return null
})