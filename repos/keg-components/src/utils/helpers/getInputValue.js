import { get, isFunc, isArr } from 'jsutils'

/**
 * Gets the correct key name based on the platform and available onChange functions
 * @param {boolean} isWeb - Is on the web platform
 * @param {function} onChange - handles changes the value
 * @param {function} onValueChange - handles changes the value (Native)
 * @param {boolean} readOnly - Is the the component read only
 *
 * @returns {string} - Name of prop key to use
 */
export const getInputValueKey = (isWeb, onChange, onValueChange, readOnly) => {
  return !isWeb
    ? 'selectedValue'
    : isFunc(onChange) || isFunc(onValueChange) || readOnly
      ? 'value'
      : 'defaultValue'
}

/**
 * Checks if value exists, if not, tries to get the value from the children
 * @param {Any} value - Value to use
 * @param {*} children - Children of a component
 *
 * @returns {Any} - Found value
 */
export const getValueFromChildren = (value, children) => {
  return value
    ? value
    : children
      ? isArr(children)
          ? get(children, [ '0', 'props', 'children' ])
          : get(children, [ 'props', 'children' ])
      : ''
}
