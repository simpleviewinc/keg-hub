import { useEffect } from 'react'
import { getPlatform } from 'KegGetPlatform'

const platform = getPlatform()

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
    if (platform !== 'web') return

    // scroll the element into view according to the scroll options, so long as ref stores the element
    shouldScroll && ref.current?.scrollIntoView(scrollOptions)
  }, [ ref, shouldScroll, scrollOptions ])

  return [ ref ]
}