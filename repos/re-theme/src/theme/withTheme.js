/** @module theme */
'use strict'

import React from 'react'
import { ReThemeContext } from '../context/reThemeContext'

/**
 * Adds the theme, merge and dimensions props from the Context to the passed in components' props
 * @param {*} Component
 *
 * @returns {Class} - React Component wrapping the Context Consumer and the passed in component
 */
export const withTheme = Component => {
  return props => {
    return (
      <ReThemeContext.Consumer>
        { value => {
          return <Component
            theme={value}
            {...props}
          />
        } }
      </ReThemeContext.Consumer>
    )
  }
}
