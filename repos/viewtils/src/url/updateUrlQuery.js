import { inPopStateUpdate } from './listenToPopState'
import { queryToObj, objToQuery, noOpObj } from '@keg-hub/jsutils'

/**
 * Wrapper around window.location and window.history
 * Encapsulates the global APIs to ensure consistency
 * @function
 * @private
 *
 * @return {Object} - Contains the location and history global objects
 */
const getWindowProps = () => {
  return typeof window === "undefined"
    ? noOpObj
    : (() => ({ location: window.location, history: window.history }))()
}

/**
 * Builds the new query to be the the browser url should be update to
 * @function
 * @private
 * @param {Object} current - The current query params of the browser url
 * @param {Object} update - New query params to be added to the url
 * @param {boolean} merge - Should the update be merged with the current query params
 *
 * @return {string} - Stringified version of the query params
 */
const buildQuery = (current, update, merge) => {
  const query = merge ? { ...current, ...update }: update
  return objToQuery(query)
}

/**
 * Updates the browsers url query params without reloading the window
 * @function
 * @public
 * @export
 * @param {Object} update - New query params to be added to the url
 * @param {boolean} merge - Should the update be merged with the current query params
 *
 * @return {void}
 */
export const updateUrlQuery = (update=noOpObj, merge, listener) => {
  if(inPopStateUpdate()) return

  const { location, history } = getWindowProps()
  const current = queryToObj(location.search)

  history.pushState(noOpObj, '', buildQuery(current, update, merge))
}