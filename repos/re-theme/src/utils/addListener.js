import { checkCall } from 'jsutils'

/**
 * Adds an event listener to the passed in element
 *
 * @param {*} element - Adds the eventlistener to this param
 * @param {string} event - Event to listen for
 * @param {function} method - Method to call when event fires
 * @param {Object|boolean} options - Options for eventlisteners on browsers
 */
export const addListener = (element, event, method, options) => {
  element && checkCall(element.addEventListener, event, method, options || false)
}
