/** @module theme */
'use strict'

import { isArr, isFunc, isNum } from '@ltipton/jsutils'

const listeners = {}

/**
 * Add a function to an event type
 * <br/> Returns an index which can be used to remove the listener when needed
 * @param {string} event - Names of event to add the listener to
 * @param {function} listener - Listener function to add
 *
 * @returns {number} - Index of the listener in the events array cache
 */
const addThemeEvent = (event, listener) => {
  // Ensure event and listener are passed in correctly
  if (!event || !isFunc(listener)) return

  // Create the new event event
  listeners[event] = listeners[event] || []

  // Add the listener to the event event
  listeners[event].push(listener)

  // Return the index of the added listener
  return listeners[event].length - 1
}

/**
 * Remove a registered event listener
 * @param {string} event - Names of event to remove listeners for
 * @param {function} removeListener - Listener function to remove
 *
 * @returns {void}
 */
const removeThemeEvent = (event, removeListener) => {
  // Ensure the proper params are passed in
  if (!event || !listeners[event] || (!removeListener && removeListener !== 0))
    return

  // If an index is passed in, use that to remove the listener function
  isNum(removeListener)
    ? // Use splice to remove the listener at the correct index
      listeners[event].splice(removeListener, 1)
    : // Otherwise ensure the listener and events exists, then filter out the listener
    isFunc(removeListener) &&
      isArr(listeners[event]) &&
      (listeners[event] = listeners[event].filter(
        listener => listener !== removeListener
      ))
}

/**
 * Calls all functions registered to the passed in event name
 * @param {*} event - Event to call listeners for
 * @param {*} params - params to pass to the registered functions
 *
 * @returns {void}
 */
const fireThemeEvent = (event, ...params) => {
  isArr(listeners[event]) &&
    listeners[event].forEach(listener => listener(...params))
}

/**
 * Clears registered listeners from the listeners object
 * If event is passed, will only clear listeners for that event
 * @param {string=} event - Name of the event to clear
 *
 * @returns {void}
 */
// const clearThemeEvents = event => {
//   event && listeners[event] ? (listeners[event] = []) : (listeners = {})
// }

export { addThemeEvent, fireThemeEvent, removeThemeEvent }
