import { exists } from '@svkeg/jsutils'

/**
 * Builds the selector used to select the web dom element and apply styles to it
 * @function
 * @param {string} config - Define how the selector is built
 * @param {string} config.className - Reference used to build the selector
 * @param {string} config.prefix - prefix used to filter references to be updated
 * @param {string} config.selector - Template selector to build on found reference
 *
 * @returns {string} - Built selector
 */
export const getCssSelector = ({ className, prefix, selector }) => {
  selector = (selector || `[data-class~="{{selector}}"]`).replace(/\s/g, '')

  const hasRef = className.indexOf('.') === 0 ||
    className.indexOf('#') === 0 ||
    className.indexOf('[') === 0

  return hasRef
    ? className
    : !exists(prefix) || (prefix && className.indexOf(prefix) === 0)
      ? `${selector.replace('{{selector}}', className)}`
      : className

}
