/** @module hooks */

import { useMemo } from 'react'
import { useTheme } from './useTheme'
import { noPropObj } from '@keg-hub/jsutils'

/**
 * Merges styles defined by styleArgs into a memoized style object
 * @param  {...(string | Object)} styleArgs - any number of strings or style objects. Strings are expected to be theme paths, which will be used to get the associated theme object for that path.
 * @returns {Object} - result of merging style objects
 * @example
 * const textStyles = useStyle('todos.text', textStylesObject)
 * const myStyles = useStyle(
 *  'settings.button',
 *  { main: { margin: 5 }},
 *  inputStyles,
 *  'someOtherPath.button'
 * )
 */
export const useStyle = (...styleArgs) => {
  const theme = useTheme()
  return useMemo(() => theme.get(...styleArgs) || noPropObj, [
    theme,
    ...styleArgs,
  ])
}
