/** @module hooks */

import { useThemeState } from './useThemeState'

/**
 * Creates an useThemeFocus hook based on the 'focus' and 'blur' events
 */
export const useThemeFocus = useThemeState('focus')
