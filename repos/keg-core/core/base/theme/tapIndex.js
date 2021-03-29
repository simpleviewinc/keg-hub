export { theme } from '@keg-hub/keg-components'

/**
 * Default theme config override
 * Sets the default font-family to be FiraSana
 * This file should only be loaded when a tap does not override the tapIndex.js file
 * @Object
 */
export const themeConfig = {
  typography: {
    font: {
      family: {
        $native: {
          fontFamily: 'FiraSans-Regular',
        },
      }
    }
  }
}