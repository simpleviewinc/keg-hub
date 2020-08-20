/**
 * Holds the current theme after it's built
 */
let currentTheme = {}

/**
 * Helper to allow other methods to get the current theme used by the provider
 * @returns {Object} currentTheme - Current theme used by the provider
 */
export const getCurrentTheme = () => currentTheme

/**
 * Helper to update the current Theme when ever the theme is built
 * Gets added as an event listener, and is called every time the theme is re-built
 * @param {Object} updatedTheme - Update built theme
 */
export const updateCurrentTheme = updatedTheme => (currentTheme = updatedTheme)
