import { isValidItemRequest, handleInvalidRequest } from './errorHandler'
import { ItemsRequestError } from './error'
import { isArr, omitKeys, omitRange } from '@keg-hub/jsutils'
import '../typedefs'

/**
 * Removes the item, identified by key, from the category in the items store.
 * @param {Object} state - redux store state
 * @param {Action} action - an action of the form { type, payload: { category, key }}
 * @returns the next state, with the item removed
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const removeItem = (state, action) => {
  const { category, key } = action.payload

  const { isValid, issues } = isValidItemRequest(state, category, key)
  if (!isValid) {
    const err = new ItemsRequestError(issues)
    return handleInvalidRequest(state, category, err)
  }

  return {
    ...state,
    [category]: isArr(state[category])
      ? omitRange(state[category], key, 1)
      : omitKeys(state[category], [key]),
  }
}
