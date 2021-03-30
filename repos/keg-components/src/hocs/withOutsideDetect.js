import React from 'react'
import { useOutsideDetect } from 'KegHooks'

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

    const fallbackRef = React.useRef()
    const detectRef = ref || fallbackRef
    useOutsideDetect(detectRef, onOutsideClick)

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