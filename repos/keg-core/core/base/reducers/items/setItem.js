import { isValidSetItemRequest, handleInvalidRequest } from './errorHandler'
import { ItemsRequestError } from './error'
import { isArr } from '@svkeg/jsutils'
import '../typedefs'

/**
 * Sets the item into category by its key. This will completely replace any value already associated with that key.
 * `category`, `key`, and `item` are all required properties in `action`'s payload.
 * If the category is stored as an array, the key is expected to be an index (number).
 * @param {Object} state - redux store state
 * @param {Action} action - an action of the form { type, payload: { category, key, item }}
 * @returns the next state, with the item inserted/updated
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const setItem = (state, action) => {
  const { category, key, item } = action.payload

  // verifies that key and category are defined & checks other invariants
  const { isValid, issues } = isValidSetItemRequest(state, category, key, item)
  if (!isValid) {
    const err = new ItemsRequestError(issues)
    return handleInvalidRequest(state, category, err)
  }

  return {
    ...state,
    [category]: setItemInCollection(state[category], key, item),
  }
}

/**
 * Returns a new collection with all the same type and elements as coll, but with the new key-item pair. If coll
 * is an array, key is expected to be an index. If the key-item pair already exists, it is overwritten.
 * @param {Object | Array} coll
 * @param {*} key
 * @param {*} item
 */
const setItemInCollection = (coll, key, item) => {
  const nextCollection = isArr(coll) ? [...coll] : { ...coll }

  nextCollection[key] = item

  return nextCollection
}
