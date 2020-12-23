import { useState, useEffect, useCallback } from 'react'
import { throttle, noOp } from '@keg-hub/jsutils'

/**
 * Custom hook to track the browser windows scroll position
 * <br/> The onScroll prop should be a function on consistent identity for the throttle to work
 * <br/> I.E. Wrap with `useCallback` if needed
 * @function
 * @example
 * const [{ scrollX, scrollY }] = useScroll()
 * @param {function} [onScroll] - Function called when the scroll event fires
 * @param {number} [amount=30] - Throttle amount for the scrollHandler callback
 *
 * @returns {Object} The current scrollX and scrollY positions
 */
export const useScroll = (onScroll = noOp, amount = 30) => {
  const [ scroll, setScroll ] = useState({
    scrollX: 0,
    scrollY: 0,
  })

  const eventHandler = useCallback(
    event => {
      const scrollUpdate = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
      }

      onScroll(event, scrollUpdate)
      setScroll(scrollUpdate)
    },
    [onScroll]
  )

  useEffect(() => {
    const scrollHandler = throttle(eventHandler, amount)
    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [ eventHandler, amount ])

  return scroll
}
