/** @module hooks */

import { hookFactory } from './hookFactory'

/**
 * Creates an useThemeHover hook based on the 'pointerover' and 'pointerout' events
 */
export const useThemeHover = hookFactory({
  on: 'pointerover',
  off: 'pointerout',
})
