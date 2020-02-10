/** @module hooks */

import { hookFactory } from './hookFactory'

/**
 * Creates an useThemeActive hook based on the 'mouseenter' and 'mouseleave' events
 */
export const useThemeActive = hookFactory({ on: 'mousedown', off: 'mouseup' })