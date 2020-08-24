/** @module dimensions */

import { debounce, isArr, isFunc, checkCall } from '@svkeg/jsutils'
import { Constants } from '../constants'
import { setRNDimensions } from './dimensions'
import { hasDomAccess } from '../helpers/hasDomAccess'

const DEBOUNCE_RATE = 100

/**
 * Gets the window object if it's available
 *
 * @returns {Object} - Browser window object
 */
const getWindow = () => {
  const winAccess = !hasDomAccess()

  return winAccess
    ? {
        devicePixelRatio: undefined,
        innerHeight: undefined,
        innerWidth: undefined,
        width: undefined,
        height: undefined,
        screen: {
          height: undefined,
          width: undefined,
        },
      }
    : (() => {
        return window
      })()
}

const winDim = getWindow()

/**
 * Adds an event listener to the passed in element
 *
 * @param {*} element - Adds the eventlistener to this param
 * @param {string} event - Event to listen for
 * @param {function} method - Method to call when event fires
 * @param {Object|boolean} options - Options for eventlisteners on browsers
 */
const addListener = (element, event, method, options) => {
  element &&
    checkCall(element.addEventListener, event, method, options || false)
}

/**
 * Sets the screen size from the passed in window object
 * @param {Object} win - window object to set the screen size
 *
 * @returns {Object} - Updated screen object
 */
const setScreen = win => {
  return {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width,
  }
}

/**
 * Sets the window size from the passed in window object
 * @param {Object} win - window object to set the screen size
 *
 * @returns {Object} - Updated window object
 */
const setWin = win => {
  return {
    fontScale: 1,
    height: win.innerHeight,
    scale: win.devicePixelRatio || 1,
    width: win.innerWidth,
  }
}

/**
 * Default dimensions object
 */
const dimensions = { window: setWin(winDim), screen: setScreen(winDim) }

/**
 * Event listeners cache
 */
const listeners = {}

/**
 * Gets a dimensions property based on the passed in value
 * @param {string} dimension - string key name as window || screen
 *
 * @returns {Object} - window or screen property of the dimensions object
 */
const get = key => dimensions[key]

/**
 * Sets a dimensions property based on the passed in values
 * @param {Object} dimensions - Object to update the dimensions values
 *
 * @returns {null}
 */
const set = ({ screen, window: win }) => {
  screen && (dimensions.screen = screen)
  win && (dimensions.window = win)
}

/**
 * Updates the dimensions object based on the current screen and window sizes
 * Calls any event listeners listening for dimensions updates
 */
const update = () => {
  dimensions.window = setWin(winDim)
  dimensions.screen = setScreen(winDim)

  isArr(listeners[Constants.CHANGE_EVENT]) &&
    listeners[Constants.CHANGE_EVENT].forEach(
      listener => !listener.shouldUnmount && listener(dimensions)
    )
}

/**
 * Adds an event listener to the even type
 * @param {string} type - Type of event to listen for
 * @param {function} listener - function to call when the event fires
 *
 */
const addEventListener = (type, listener) => {
  if (!type || !isFunc(listener)) return

  listeners[type] = listeners[type] || []
  listeners[type].push(listener)
}

/**
 * Removes an event listener
 * @param {string} type - Type of event to listen for
 * @param {function} listener - function to remove from the event type
 *
 */
const removeEventListener = (type, removeListener) => {
  type &&
    isFunc(removeListener) &&
    isArr(listeners[type]) &&
    (listeners[type] = listeners[type].filter(
      listener => listener !== removeListener
    ))
}

// Check if we have access to the DOM, and if so add a resize event listener
hasDomAccess() &&
  checkCall(() =>
    addListener(window, Constants.RESIZE_EVENT, debounce(update, DEBOUNCE_RATE))
  )

const Dimensions = {
  get,
  set,
  update,
  addEventListener,
  removeEventListener,
}

setRNDimensions(Dimensions)

export { Dimensions, setRNDimensions }
