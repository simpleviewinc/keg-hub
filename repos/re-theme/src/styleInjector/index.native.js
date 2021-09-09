import React, { useMemo } from 'react'
import { noPropArr } from '@keg-hub/jsutils'

/**
 * Stub for Native StyleInjector calls, just renders the component
 */
export const StyleInjector = Component => props => <Component {...props} />

/**
 * Stub for Native useStyleTag calls
 * Returns an object matching the useStyleTag hook
 */
export const useStyleTag = (style, className = '') =>
  useMemo(
    () => ({
      filteredStyle: style,
      css: { all: '', rules: noPropArr },
      classNames: className,
    }),
    [ style, className ]
  )
