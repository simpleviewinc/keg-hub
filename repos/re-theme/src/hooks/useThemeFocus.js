/** @module hooks */

import { hookFactory } from './hookFactory'

/**
 * Creates an useThemeFocus hook based on the 'mouseenter' and 'mouseleave' events
 */
export const useThemeFocus = hookFactory({ on: 'focus', off: 'blur' })