import { useEffect } from 'react'

/**
 * Ensures the DOM element stored in `ref` remains visible
 * in the surrounding scroll list, provided that `shouldScroll`
 * is true.
 * 
 * @param {RefObject} ref - ref to element
 * @param {boolean} shouldScroll - if true, keep ref.current visible
 * @param {boolean|object} scrollOptions - options as defined at
 *    https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#parameter
 */
export const useScrollIntoView = (ref, shouldScroll, scrollOptions=true) => {
  useEffect(() => {
    if (!ref.current)
      return console.warn(
        'Component does not appear to be accepting a ref. Unable to scroll it into view.',
        Component
      )

    // scroll the element into view according to the scroll options
    shouldScroll && 
      ref.current?.scrollIntoView(scrollOptions)

  }, [ ref, shouldScroll, scrollOptions ])

  return [ ref ]
}