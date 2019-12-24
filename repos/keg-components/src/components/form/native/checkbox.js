import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const CheckBox = withTheme(props => {
  const { theme, children, onClick, onPress, ...args } = props
  const checkboxStyle = theme.join(get(theme, ['form', 'checkbox' ]), style)

  return null

})