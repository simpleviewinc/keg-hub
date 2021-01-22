import { useState, useLayoutEffect, useCallback, useRef } from 'react'
import { noOp, throttle } from '@keg-hub/jsutils'
import { getScrollValues } from 'KegGetScrollValues'
/**
 * Custom hook to track the browser windows scroll position
 * <br/> The onScroll prop should be a function on consistent identity for the throttle to work
 * <br/> I.E. Wrap with `useCallback` if needed
 * @function
 * @example
 * const [{ scrollX, scrollY }] = useScroll()
 * @param {function} [onScroll] - Function called when the scroll event fires
 * @param {function} [onScrollEnd] - Function called at the end of the scroll event
 * @param {number} [amount=50] - Throttle amount for the scrollHandler callback
 *
 * @returns {Object} The current scrollX and scrollY positions
 */
export const useScroll = (onScroll = noOp, onScrollEnd = noOp, amount = 50) => {
  const [ scroll, setScroll ] = useState({
    scrollX: 0,
    scrollY: 0,
  })

  const timeoutRef = useRef(null)

  const eventHandler = useCallback(
    throttle((event, isEnd = false) => {
      const scrollUpdate = getScrollValues()

      isEnd
        ? onScrollEnd?.(event, scrollUpdate)
        : onScroll?.(event, scrollUpdate)

      setScroll(scrollUpdate)
    }, amount),
    [ amount, onScroll, onScrollEnd, setScroll ]
  )

  const handlerTimeout = useCallback(
    event => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        eventHandler(event, true)
      }, 3 * amount)

      eventHandler(event)
    },
    [ amount, timeoutRef && timeoutRef.current, eventHandler ]
  )

  useLayoutEffect(() => {
    window.addEventListener('scroll', handlerTimeout)

    return () => window.removeEventListener('scroll', handlerTimeout)
  }, [handlerTimeout])

  return scroll
}
