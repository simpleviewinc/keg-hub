import { noOpObj } from '@keg-hub/jsutils'
import { getQueryData } from './getQueryData'

/**
 * The current popstate
 * @boolean
 */
let IN_POP_STATE = false

/**
 * Handler for window.popstate events
 * Updates the redux store based on the updated url params
 * @function
 * @public
 * @export
 * @param {function} cb - Callback to call when the popstate event fires
 *
 * @return {function} - Method to remove the popstate listener
 */
export const listenToPopState = cb => {
  const listener = async event => {
    IN_POP_STATE = true
    // Get the query params from the url and call the callback
    isFunc(cb) && await cb(getQueryData() || noOpObj)

    IN_POP_STATE = false
  }

  window.addEventListener('popstate', listener)

  return () => (window.removeEventListener('popstate', listener))
}


/**
 * Helper to know when the updates are coming form a pop-state update
 * @function
 * @public
 * @export
 *
 * @return {boolean} - The current popstate
 */
export const inPopStateUpdate = () => IN_POP_STATE