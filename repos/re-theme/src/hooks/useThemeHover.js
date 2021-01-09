/** @module hooks */

import { useThemeState } from './useThemeState'

/**
 * Creates an useThemeHover hook based on the 'pointerover' and 'pointerout' events
 */
export const useThemeHover = useThemeState('hover')
