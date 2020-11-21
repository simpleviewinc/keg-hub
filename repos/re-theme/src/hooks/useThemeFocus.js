/** @module hooks */

import { useThemeState } from './useThemeState'

/**
 * Creates an useThemeFocus hook based on the 'mouseenter' and 'mouseleave' events
 */
export const useThemeFocus = useThemeState('focus')
