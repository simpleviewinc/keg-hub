import { noPropArr } from '../utils/helpers/noop'

/**
 * Returns a function that should be set as the element ref
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, and the defClass value
 * @param {Array|string} className - Array of classes to add
 * @param {Array} classList - Array of default classes
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassList = () => {
  return noPropArr
}
