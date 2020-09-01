import { exists } from '@svkeg/jsutils'

/**
 * Builds the format used to select the web dom element and apply styles to it
 * @function
 * @param {string} config - Define how the format is built
 * @param {string} config.selector - Reference used to build the format
 * @param {string} config.prefix - prefix used to filter references to be updated
 * @param {string} config.format - Template format to build on found reference
 *
 * @returns {string} - Built format
 */
export const getCssSelector = ({ selector, prefix, format }) => {
  format = (format || `[data-class~="{{selector}}"]`).replace(/\s/g, '')

  const hasRef = selector.indexOf('.') === 0 ||
    selector.indexOf('#') === 0 ||
    selector.indexOf('[') === 0

  return hasRef
    ? selector
    : !exists(prefix) || (prefix && selector.indexOf(prefix) === 0)
      ? `${format.replace('{{selector}}', selector)}`
      : selector

}
