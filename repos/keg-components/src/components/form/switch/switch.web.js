import React from 'react'
import { SwitchWrapper } from './switch.wrapper'
import PropTypes from 'prop-types'
import { View } from 'KegView'

/**
 * Switch
 * @summary Custom switch component. All props are optional
 *
 * @param {Object} props - see switchPropTypes
 * @property {String} props.text - switch text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Object} props.styles - custom styles for each element
 * @property {Function} props.onPress - function to do when switch is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} ref - reference to native element
 *
 */
const Element = React.forwardRef(({ elProps, styles, ...props }, ref) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.area}></View>
      <View style={styles.indicator}></View>
      <input
        {...elProps}
        {...props}
        type='checkbox'
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          margin: 0,
          opacity: 0,
          cursor: 'pointer',
        }}
      />
    </View>
  )
})

export const Switch = props => (
  <SwitchWrapper
    {...props}
    elType={'switch'}
    Element={Element}
    isWeb={true}
  />
)

Switch.propTypes = {
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
