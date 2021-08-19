import { deepFreeze } from '@keg-hub/jsutils'
import { Values } from 'KegConstants'

const { HttpMethods } = Values

export const networkRequestModel = deepFreeze({
  method: HttpMethods.GET,
  url: null,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

/**
 * object model used to parse response data from network call
 */
export const networkResponseModel = deepFreeze({
  success: false,
  statusCode: null,
  data: null,
  errorMessage: null,
})
