import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Option = withTheme(props => {
  const { theme, children, style, ...args } = props

  return (
    <option { ...args }>
      { children }
    </option>
  )
})