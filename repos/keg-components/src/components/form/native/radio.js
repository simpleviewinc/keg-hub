import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Radio = withTheme(props => {
  const { theme, children, style, onClick, onPress, ...args } = props
  const radioStyle = theme.join(get(theme, ['form', 'radio' ]), style)

  return null

})