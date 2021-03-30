import React from 'react'
import { useOutsideDetect } from 'KegHooks'
import { handleRefUpdate } from '../utils/helpers/handleRefUpdate'

import PropTypes from 'prop-types'

/**
 * Wraps component with detection of clicks outside its bounds. The returned component
 * accepts an additional prop: onOutsideClick, which fires whenever
 * the user clicks outside of `Component`.
 * @param {Component} Component (must accept a `ref`)
 * @return {Component} the wrapped component
 */
export const withOutsideDetect = (Component) => {
  const wrapped = React.forwardRef((props, ref) => {
    const { 
      onOutsideClick, 
      ...clientProps 
    } = props

    const detectRef = React.useRef()
    useOutsideDetect(ref || detectRef, onOutsideClick)

    return <Component 
      {...clientProps} 
      ref={detectRef} 
    />
  })

  wrapped.propTypes = {
    ...Component.propTypes,
    onOutsideClick: PropTypes.func,
  }

  return wrapped
}