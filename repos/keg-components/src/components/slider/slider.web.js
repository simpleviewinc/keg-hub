import React, { useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { get } from 'jsutils'
import { useTheme } from 're-theme'

/**
 * Gets the height of the slider component
 *
 * @param {string|number} height - current state height 
 * @param {boolean} toggled - is the slider open or closed
 * @returns {string|number} - height that the slider should be
 */
const getHeight = (height, toggled) => {
  return toggled
    ? height
    : height && !toggled
      ? 0
      : null
}

/**
 * Slider
 * @summary Custom Slider component. All props are optional
 *
 * @param {Object} props - see sliderPropTypes
 * @property {String} props.toggled - Is the slider open or closed
 * @property {Object} props.style - custom style
 * @property {Object} props.children
 *
 */
export const Slider = props => {

  const theme = useTheme()
  const { style, children, toggled } = props

  const slideRef = useRef(null)

  const [ height, setHeight ] = useState(null)

  useLayoutEffect(() => {
    const curHeight = get(slideRef, 'current.offsetHeight')
    if(curHeight === 0) return

    height !== curHeight && setHeight(curHeight)
  }, [ height ])

  const sliderStyle = theme.join(
    { overflow: 'hidden', transition: 'max-height 1s ease' }
    get(theme, 'components.slider'),
    style,
    { maxHeight: getHeight(height, toggled) },
  )

  return (
    <div ref={ slideRef } style={ sliderStyle } >
      { children }
    </div>
  )
}

const sliderPropTypes = {
  toggled: PropTypes.boolean,
  style: PropTypes.object,
  children: PropTypes.object,
}

Slider.propTypes = sliderPropTypes