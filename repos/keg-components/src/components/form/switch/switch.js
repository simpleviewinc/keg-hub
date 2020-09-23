import React from 'react'
import { View } from 'KegView'
import { useClassName } from 'KegClassName'
import { getPlatform } from 'KegGetPlatform'
import { SwitchWrapper } from './switch.wrapper'
import { Switch as RNSwitch } from 'react-native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

const isWeb = getPlatform() === 'web'

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
    className,
    elProps,
    style,
    styles = {},
    thumbColor,
    trackColor,
    ...attrs
  } = props

  const classRef = useClassName('keg-switch', className, ref)
  const InjectedComp = StyleInjector(
    RNSwitch,
    { displayName: 'Switch', className: 'keg-switch' }
  )

  return (
    <View
      className='keg-switch-area'
      style={styles.main}
    >
      <InjectedComp
        style={styles.switch}
        {...getSwitchColors(thumbColor, trackColor, styles)}
        {...elProps}
        {...attrs}
        ref={classRef}
      />
    </View>
  )
})

export const Switch = props => (
  <SwitchWrapper
    {...props}
    elType={'switch'}
    Element={Element}
    isWeb={isWeb}
  />
)

Switch.propTypes = {
  ...RNSwitch.propTypes,
  ...SwitchWrapper.propTypes,
}
