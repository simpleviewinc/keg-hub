/** @module hooks */

import { hookFactory } from './hookFactory'

/**
 * Creates an useThemeHover hook based on the 'mouseenter' and 'mouseleave' events
 */
export const useThemeHover = hookFactory({ on: 'mouseenter', off: 'mouseleave' })