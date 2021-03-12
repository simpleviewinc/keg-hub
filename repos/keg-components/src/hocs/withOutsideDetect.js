import React from 'react'
import { useOutsideDetect } from 'KegHooks'
import PropTypes from 'prop-types'

/**
 * Wraps component with detection of clicks outside its bounds. The returned component
 * accepts an additional prop: onOutsideClick, which fires whenever
 * the user clicks outside of `Component`.
 * @param {Component} Component 
 * @return {Component} the wrapped component
 */
export const withOutsideDetect = (Component) => {
  const wrapped = props => {
    const { 
      onOutsideClick, 
      ...clientProps 
    } = props

    const ref = React.useRef()
    useOutsideDetect(ref, onOutsideClick)

    return <Component 
      {...clientProps} 
      ref={ref} 
    />
  }

  wrapped.propTypes = {
    ...Component.propTypes,
    onOutsideClick: PropTypes.func,
  }

  return wrapped
}