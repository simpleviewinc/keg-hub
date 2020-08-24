import { useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { noOp } from 'KegUtils'
import { isArr } from '@svkeg/jsutils'

/**
 * A hook for running an animation from an origin (from) point to a destination (to) point
 * @param {Object} params - options object
 * @param {number} params.from - the starting value of the animation
 * @param {number} params.to - the ending destination value of the animation
 * @param {Number} params.duration - time in milliseconds that the animation should proceed
 * @param {Function} params.onFinish - passed to Animated.start(), called when the animation finishes
 * @param {Array} dependencies - optional array of dependencies that will dictate when the hook re-runs the animation.
 *                               By default, the animation reruns if the `from` or `to` values change.
 * @returns {Array} [ Animated.Value ]
 *  - Animated.Value: pass this value to your Animated.View to begin the animation
 */
export const useFromToAnimation = (params, dependencies) => {
  const { from, to, duration = 500, onFinish = noOp } = params || {}

  // determines when the animation should run
  const animDependencies = isArr(dependencies) ? dependencies : [ from, to ]

  // define the animated value here so we can return it. It needs to recompute
  // whenever the animation would run again, which is why it shares hookDependencies
  // with the useEffect below
  const fromVal = useMemo(() => new Animated.Value(from), animDependencies)

  useEffect(() => {
    Animated.timing(fromVal, { toValue: to, duration }).start(onFinish)
  }, animDependencies)

  return [fromVal]
}
