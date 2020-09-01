/**
 * Builds the selector used to select the web dom element and apply styles to it
 * @function
 * @param {string} config - Define how the selector is built
 * @param {string} config.cssRef - Reference used to build the selector
 * @param {string} config.prefix - prefix used to filter references to be updated
 * @param {string} config.selector - Template selector to build on found reference
 *
 * @returns {string} - Built selector
 */
export const getCssSelector = ({ cssRef, prefix, selector }) => {

  const hasRef = cssRef.indexOf('.') === 0 ||
    cssRef.indexOf('#') === 0 ||
    cssRef.indexOf('[') === 0

  return hasRef
    ? cssRef
    : config.prefix && cssRef.indexOf(config.prefix) === 0
      ? `${config.selector.replace('{{selector}}', cssRef)}`
      : cssRef

}
