import React, { useState, useLayoutEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { checkCall, isObj } from '@keg-hub/jsutils'

/**
 * Default animation config
 * @object
 */
const defConfig = {
  duration: 1000,
  easing: Easing.linear,
  toValue: 0,
}

/**
 * Checks if the animation should NOT run
 * @function
 * @param {boolean} toggled - Current state of the Slider toggled open
 * @param {number} current - Current height of the Slider / animated.value
 * @param {number} values - Ref that holds the from and to values
 *
 * @returns {boolean} - If the animation should NOT run
 */
const noAnimate = (toggled, current, { from, to }) => (
  !toggled && current === from) || (toggled && current === to
)

/**
 * Builds the config passed to the Animation timing method
 * @function
 * @param {Object} config - Custom animation config
 * @param {number} values - Values being animated
 *
 * @returns {Object} - Built animation config
 */
const buildConfig = (config, values) => {
  return checkCall(config, defConfig, values) || {
    ...defConfig,
    ...(isObj(config) ? config : {}),
    toValue: values.to,
  }
}

/**
 * Checks if the animation should NOT run
 * @function
 * @param {boolean} props.toggled - Flag to switch the animation state between from and to
 * @param {Object|function} config - Animation config object or function that returns an object
 * @param {function} props.onFinish - Callback called after the animation is toggled
 * @param {Object} props.values - Contains the from and to values to animate between
 *
 * @returns {Object} - Object containing the animation and values objects
 */
export const useToggleAnimate = props => {
  const { config, toggled, onFinish } = props

  // Define the default values as a ref
  const values = useRef({ from: 0, to: 0, ...props.values })

  // Define the animated value with a state hook
  const [ animation ] = useState(new Animated.Value(values.current.from))

  useLayoutEffect(() => {
    if(noAnimate(toggled, animation._value, values.current)) return

    // Define the from and to values for the animation based on toggled flag
    const { from, to } = values.current
    const aniChanges = toggled
      ? values.current
      : { from: to, to: from }

    // Update the animation value to animate from
    animation.setValue(aniChanges.from)

    // Setup and from the animation
    Animated.timing(animation, buildConfig(config, aniChanges))
      .start(() => checkCall(onFinish, props, animation, values))

  // Add toggled as a dep, so anytime it changes, we run the hook code
  }, [ toggled ])

  return { animation, values }

}