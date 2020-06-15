import PropTypes from 'prop-types'
import React from 'react'
import { SwitchWrapper } from './switch.wrapper'
import { Switch as RNSwitch, TouchableOpacity } from 'react-native'
import { View } from 'KegView'

/**
 * Gets the custom Native Switch colors from the passed in styles
 * @param {string} thumbColor - Color of the on/off indicator
 * @param {string} trackColor - Color of the background track
 * @param {Object} styles - { indicator={}, area={} } - passed in switch styles
 *
 * @returns {Object} - Contains the Native color props for the Switch component
 */
const getSwitchColors = (
  thumbColor,
  trackColor,
  { indicator = {}, area = {} }
) => {
  const indicatorColor = thumbColor || indicator.color
  const areaColor = trackColor || area.backgroundColor
  const colors = {
    ...(indicatorColor && { thumbColor: thumbColor || color }),
    ...(areaColor && { trackColor: areaColor, onTintColor: areaColor }),
  }

  return colors
}

/**
 * Switch
 * @summary Custom switch component. All props are optional
 *
 * @param {Object} props - see switchPropTypes
 * @property {String} props.text - switch text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when switch is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
const Element = React.forwardRef((props, ref) => {
  const {
    elProps,
    style,
    styles = {},
    thumbColor,
    trackColor,
    ...attrs
  } = props

  return (
    <View style={styles.wrapper}>
      <RNSwitch
        {...getSwitchColors(thumbColor, trackColor, styles)}
        {...elProps}
        {...attrs}
        ref={ref}
      />
    </View>
  )
})

export const Switch = props => (
  <SwitchWrapper
    {...props}
    elType={'switch'}
    Element={Element}
  />
)

Switch.propTypes = {
  ...TouchableOpacity.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}
