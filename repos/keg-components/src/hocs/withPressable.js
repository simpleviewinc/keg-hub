import React from 'react'
import { Touchable } from '../components/touchable'
import { getPressHandler } from '../utils'
import {View} from 'KegView'
import { useStyle } from '@keg-hub/re-theme'
import { noPropObj } from '@keg-hub/jsutils'

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

    // set default active opacity since Pressable has none by default
    const activeStyles = useStyle('pressable.active')
    const defaultStyles = useStyle('pressable.default')

    return (
      <Touchable
        disabled={otherProps?.disabled}
        {...getPressHandler(false, onClick, onPress)}
        style={defaultStyles}
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