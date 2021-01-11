import { useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { noOp } from '@keg-hub/jsutils'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

/**
 * A hook for running an animation from an origin (from) point to a destination (to) point
 * @param {Object} params - options object
 * @param {number} params.from - the starting value of the animation
 * @param {number} params.to - the ending destination value of the animation
 * @param {Number} params.duration - time in milliseconds that the animation should proceed
 * @param {boolean} params.loop - loop the animation
 * @param {Easing} params.easing - react-native Easing obj
 * @param {Function} params.onFinish - passed to Animated.start(), called when the animation finishes
 * @returns {Array} [ Animated.Value ]
 *  - Animated.Value: pass this value to your Animated.View to begin the animation
 */
export const useFromToAnimation = params => {
  const { from, to, duration = 500, onFinish = noOp, loop = false, easing } =
    params || {}
  // determines when the animation should run
  const animDependencies = [ from, to, duration, loop, easing, onFinish ]

  // define the animated value here so we can return it. It needs to recompute
  // whenever the animation would run again, which is why it shares hookDependencies
  // with the useEffect below
  const fromVal = useMemo(() => new Animated.Value(from), animDependencies)

  const config = { toValue: to, duration, easing }
  !isWeb && (config.useNativeDriver = true)

  const animatedTiming = Animated.timing(fromVal, config)

  useEffect(() => {
    loop
      ? Animated.loop(animatedTiming).start()
      : animatedTiming.start(onFinish)
  }, animDependencies)

  return [fromVal]
}
