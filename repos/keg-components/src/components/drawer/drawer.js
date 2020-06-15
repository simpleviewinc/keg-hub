import React, { useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { get } from 'jsutils'
import { useTheme } from '@simpleviewinc/re-theme'
import { View } from 'KegView'

/**
 * Gets the height of the slider component
 *
 * @param {string|number} height - current state height
 * @param {boolean} toggled - is the slider open or closed
 * @returns {string|number} - height that the slider should be
 */
const getHeight = (height, toggled) => {
  return toggled ? height : height && !toggled ? 0 : null
}

/**
 * Drawer
 * @summary Custom Drawer component. All props are optional
 *
 * @param {Object} props - see sliderPropTypes
 * @property {String} props.toggled - Is the slider open or closed
 * @property {Object} props.style - custom style
 * @property {Object} props.children
 *
 */
export const Drawer = props => {
  const theme = useTheme()
  const { style, children, toggled } = props

  const slideRef = useRef(null)

  const [ height, setHeight ] = useState(null)

  useLayoutEffect(() => {
    const curHeight = get(slideRef, 'current.offsetHeight')
    if (curHeight === 0) return

    height !== curHeight && setHeight(curHeight)
  }, [height])

  const sliderStyle = theme.join(
    { overflow: 'hidden', transition: 'max-height 1s ease' },
    get(theme, 'components.drawer'),
    style,
    { maxHeight: getHeight(height, toggled) }
  )

  return (
    <View
      ref={slideRef}
      style={sliderStyle}
    >
      { children }
    </View>
  )
}

Drawer.propTypes = {
  toggled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.object,
}
