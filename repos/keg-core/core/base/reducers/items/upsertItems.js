import { isValidItemsRequest, handleInvalidRequest } from './errorHandler'
import { ItemsRequestError } from './error'

/**
 * Inserts the items collection (identified by category) if it doesn't exist, otherwise updates it.
 * @param {Object} state - redux store state
 * @param {Object} action - an action of the form { type, payload: { category, items }}
 * @returns the next state object, with the items inserted/updated
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const upsertItems = (state, action) => {
  const { category, items } = action.payload

  const { isValid, issues } = isValidItemsRequest(state, category, items)
  if (!isValid) {
    const err = new ItemsRequestError(issues)
    return handleInvalidRequest(state, null, err)
  }

  return {
    ...state,
    [category]: items,
  }
}
