import React from 'react'
import { Touchable } from '../components/touchable'
import { getPressHandler } from '../utils'
import {View} from 'KegView'
import { useStyle } from '@keg-hub/re-theme'

/**
 * Wraps child in Touchable component and passes in 'pressed' and 'hovered' state props
 * @see Button component for example usage
 * @param {Component} Component 
 * @param {{showFeedback:string}=} options - showFeedback: to show press/hover feedback or not. default true
 */
export const withTouch = (Component, options={}) => {
  const { showFeedback = true } = options

  /**
   * Wrapped
   * @param {Function=} props.onClick - called when the Component is clicked
   * @param {Function=} props.onPress - alias for onClick 
   * @param {Object=} props.touchStyle - style applied to the wrapper  
   * @param {*} props.* - the rest of the props to pass onto the child Component
   */
  const Wrapped = React.forwardRef((props, ref) => {
    const {
      onClick,
      onPress,
      touchStyle,
      ...otherProps
    } = props

    // set default active opacity since Touchable has none by default
    const activeStyles = useStyle('touchable.active')
    const defaultStyles = useStyle('touchable.default')

    return (
      <Touchable
        disabled={otherProps?.disabled}
        {...getPressHandler(false, onClick, onPress)}
        style={[defaultStyles, touchStyle]}
        children={
          ({ pressed, hovered }) => {
            return showFeedback
              ? <View style={[pressed && activeStyles]}>
                  <Component ref={ref} {...otherProps} pressed={pressed} hovered={hovered} />
                </View>
              : <Component ref={ref} {...otherProps} />
          }
        }
      />
    )
  })

  return Wrapped
}