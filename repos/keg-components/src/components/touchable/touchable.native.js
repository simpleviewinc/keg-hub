import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Pressable } from 'react-native'
import { useClassName } from 'KegClassName'
import { checkCall, noOpObj } from '@keg-hub/jsutils'
/**
 * Touchable
 * @summary Custom Touch component. All props are optional
 *
 * @param {Object} props - see touchablePropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {Object} props.style - custom style - Set inline with the style prop
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Object} props.children - Child components of the component
 * @property {Object} props.ref - reference to native element
 * @property {Number=} props.activeOpacity - active opacity value. default 0.4
 * @property {Function=} props.onPress - called after onPressOut
 * @property {Function=} props.onPressIn - called on touch. before OnPress
 * @property {Function=} props.onPressOut - called when touch is released
 * @property {Boolean=} props.showFeedback - enable/disable active style opacity. default true
 */
export const Touchable = React.forwardRef((props, ref) => {
  const {
    className,
    showFeedback = true,
    touchRef,
    onPress,
    onPressIn,
    onPressOut,
    activeOpacity = 0.4,
    style = noOpObj,
    ...attrs
  } = props
  const classRef = useClassName('keg-touchable', className, touchRef || ref)

  const [ touchStyles, setTouchStyles ] = useState(style)

  // update the opacity value on a touch in
  const onTouchIn = useCallback(
    event => {
      checkCall(onPressIn, event)
      showFeedback && setTouchStyles({ ...touchStyles, opacity: activeOpacity })
    },
    [ onPressIn, activeOpacity, showFeedback, touchStyles, setTouchStyles ]
  )

  // reset the styles back to default on touch out
  const onTouchOut = useCallback(
    event => {
      checkCall(onPressOut, event)
      setTouchStyles(style)
    },
    [ onPressOut, style, setTouchStyles ]
  )

  return (
    <Pressable
      accessible={true}
      {...attrs}
      style={touchStyles}
      onPress={onPress}
      onPressIn={onTouchIn}
      onPressOut={onTouchOut}
      ref={classRef}
    />
  )
})

Touchable.propTypes = {
  ...Pressable.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  showFeedback: PropTypes.bool,
  activeOpacity: PropTypes.number,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
}
