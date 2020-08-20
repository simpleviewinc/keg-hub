/** @module hooks */

import { useContext } from 'react'
import { ReThemeContext } from '../context/context'

/**
 * Uses the useContext hook from react to get the current theme ( Value prop of the context )
 *
 * @returns { Object } - Current theme
 */
export const useTheme = () => {
  return useContext(ReThemeContext)
}
