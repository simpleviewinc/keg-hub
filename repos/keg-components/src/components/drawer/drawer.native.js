import React from 'react'
import { View } from 'react-native'
import { get } from 'jsutils'
import { useTheme } from 're-theme'

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
  const { children, style, toggled } = props

  const sliderStyle = theme.join(
    { overflow: 'hidden', transition: 'max-height 1s ease' },
    get(theme, 'components.slider'),
    style,
  )

  return (
    <View style={ sliderStyle } >
      { children }
    </View>
  )
}

Slider.propTypes = {
  toggled: PropTypes.boolean,
  style: PropTypes.object,
  children: PropTypes.object,
}
