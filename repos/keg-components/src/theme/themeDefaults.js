/**
 * Cache holder for the themeDefaults object
 * @object
 */
let __themeDefaults = {}

/**
 * Sets the theme defaults object
 * @function
 * @param {Object} themeDefaults - Object to set the internal theme defaults to
 *
 * @return {void}
 */
export const setThemeDefaults = (themeDefaults = {}) =>
  (__themeDefaults = themeDefaults)

/**
 * Gets the theme defaults object
 * @function
 *
 * @return {Object} - Theme defaults object
 */
export const getThemeDefaults = () => __themeDefaults
