import { isValidUpsertItemsRequest, handleInvalidRequest } from './errorHandler'
import { ItemsRequestError } from './error'
import { isArr } from '@ltipton/jsutils'
import '../typedefs'

/**
 * Inserts `action.payload.items` (identified by category) into the store if it doesn't
 * exist, otherwise merges the existing collection with `action.payload.items`
 * @param {Object} state - redux store state
 * @param {Action} action - an action of the form { type, payload: { category, items }}
 * @returns the next state object, with the items inserted/updated
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const upsertItems = (state, action) => {
  const { category, items } = action.payload

  const { isValid, issues } = isValidUpsertItemsRequest(state, category, items)
  if (!isValid) {
    const err = new ItemsRequestError(issues)
    return handleInvalidRequest(state, null, err)
  }

  const existingItems = state[category]

  return {
    ...state,
    [category]: isArr(items)
      ? [ ...(existingItems || []), ...items ]
      : { ...(existingItems || {}), ...items },
  }
}
