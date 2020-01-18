import React from 'react'
import { SwitchWrapper } from './switch.wrapper'
import PropTypes from 'prop-types'

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
const Element = React.forwardRef(({ elProps, styles, checked, ...props }, ref) => {
  return (
    <div { ...elProps } { ...props } style={ styles.wrapper }>
      <span style={ styles.knob } ></span>
      <span style={ styles.slider }></span>
      <input
        type='checkbox'
        ref={ ref }
        checked={ checked }
        style={{
          visibility: 'hidden',
          height: 0,
          width: 0,
          maxWidth: 0,
          maxHeight: 0,
        }}
      />
    </div>
  )
})


export const Switch = props => (
  <SwitchWrapper
    styleId={ `keg-web-switch` }
    { ...props }
    Element={ Element }
    elType='web'
    isWeb={ true }
  />
)

Switch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}
