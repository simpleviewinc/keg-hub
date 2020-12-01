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
export const withPressable = (Component, options={}) => {
  const { showFeedback = true } = options

  const wrapped = React.forwardRef((props, ref) => {
    const {
      onClick,
      onPress,
      ...otherProps
    } = props

    // setup default active opacity style here since we can't directly modify the Touchable style
    const activeStyles = useStyle('pressable.active')

    return (
      <Touchable
        disabled={otherProps?.disabled}
        {...getPressHandler(false, onClick, onPress)}
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

  return wrapped
}