/** @module hooks */

import { useThemeState } from './useThemeState'

/**
 * Creates an useThemeActive hook based on the 'mousedown' and 'mouseup' events
 */
export const useThemeActive = useThemeState('active')
