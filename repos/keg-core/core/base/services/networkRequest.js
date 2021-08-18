/* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import axios from 'axios'
import { Values } from 'KegConstants'
import { logData, isStr } from '@keg-hub/jsutils'
import { networkResponseModel, networkRequestModel } from 'KegModels'
const { HttpMethods } = Values
const { GET, ...HttpMethodsWithBody } = HttpMethods

/**
 * Builds the axios request model
 * @param {networkRequestModel|string} [request] - request model || url
 *
 * @returns {request}
 */
const buildRequest = request => {
  // ensures that request is an obj if request == str
  request = (isStr(request) && { url: request }) || request

  const { params, ...requestOpt } = request
  // if request is anything other than GET, update the data property instead
  const dataTypeKey = HttpMethodsWithBody[request.method] ? 'data' : 'params'

  return {
    ...networkRequestModel,
    ...requestOpt,
    [dataTypeKey]: params,
    headers: {
      ...networkRequestModel.headers,
      ...requestOpt.headers,
    },
  }
}

/**
 * Makes a network API request based on the passed in params
 * @param {networkRequestModel|string} request - request model || url
 * @param {Obj} [request.params] - querystring obj || body obj
 * @returns {networkResponse}
 */
export const networkRequest = async request => {
  try {
    // Built the request
    const builtRequest = buildRequest(request)

    // Log the request when in DEV environment
    __DEV__ && logData(`Network Request:\n`, builtRequest)

    // builds request and pull out the data and status property
    const { data, status } = await axios(builtRequest)

    return {
      ...networkResponseModel,
      success: true,
      data: data,
      statusCode: status,
    }
  }
  catch ({ response, message, stack }) {
    logData('ERROR in makeRequest', message, stack, 'error')

    return {
      ...networkResponseModel,
      success: false,
      data: response ? response.data : null,
      statusCode: response ? response.status : null,
      errorMessage: message,
    }
  }
}
