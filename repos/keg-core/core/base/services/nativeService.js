import { nativeModels, networkResponseModel } from 'SVModels'
import { networkRequest } from 'SVServices'
import { logData } from 'jsutils'

const { routes, server } = nativeModels

/**
 * Builds the URL to make the network request
 * @param {string} [url=''] - API path to make request to
 *
 * @returns {string} - Built url
 */
const buildUrl = (url = '') => {
  return url.indexOf('http') !== 0
    ? `${server.host}${server.port && ':' + server.port}${url}`
    : url
}

/**
 * Makes Api call to update the current tap
 * @param {Object} options - Options to make the api call
 * @param {string} [method='get'] - Method used to make the API call
 *
 * @returns {networkResponseModel|Object} - response from the API
 */
const apiCall = (options, route) => {
  return networkRequest({
    ...networkResponseModel,
    ...route,
    ...options,
    url: buildUrl(options.url || route.url),
  })
}

/**
 * Initializes API call to the native API, to update the active tap
 * @param {string} tap - Name of the tap to pass to the native server
 *
 * @returns {Object} - Response from the server
 */
export const switchTap = async tap => {
  const { data, success } = await apiCall({ params: { tap } }, routes.post)
  __DEV__ && logData(`Update Tap Response:\n`, data)

  return success ? data : {}
}

/**
 * Gets the active tap from the native API
 * @param {Object} options - Options to make the api call
 *
 * @returns {Object} - Response from the server
 */
export const getActiveTap = async options => {
  const { data, success } = await apiCall(options, routes.get)
  __DEV__ && logData(`Get Tap Response:\n`, data)

  return success ? data : {}
}
