import React from 'react'
import { Touchable } from '../components/touchable'
import { getPressHandler } from '../utils'


/**
 * Wraps child in Touchable component and passes in 'pressed' and 'hovered' state props
 * @see Button component for example usage
 * @param {Component} Component 
 * @param {{showFeedback:string}=} options - showFeedback: to show press/hover feedback or not. default true
 */
export const withPressable = (Component, options={}) => {
  const { showFeedback = true } = options
  const wrapped = (props) => {
    const {
      onClick,
      onPress,
      ...otherProps
    } = props
    return (
      <Touchable
        {...getPressHandler(false, onClick, onPress)}
        children={
          ({ pressed, hovered }) => {
            return showFeedback
              ? <Component {...otherProps} pressed={pressed} hovered={hovered}/>
              : <Component {...otherProps} />
          }
        }
      />
    )
  }

  return wrapped
}