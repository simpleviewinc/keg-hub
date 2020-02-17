/** @module hooks */

import React, { useContext } from "react"
import { ReThemeContext } from '../context/context'
import { getTheme } from '../helpers/getTheme'

/**
 * Uses the useContext hook from react to get the current theme ( Value prop of the context )
 *
 * @returns { Object } - Current theme
 */
export const useTheme = () => {
  const theme = useContext(ReThemeContext)
  theme.get = getTheme.bind(theme)

  return theme
}