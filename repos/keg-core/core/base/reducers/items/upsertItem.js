import { isValidItemRequest, handleInvalidRequest } from './errorHandler'

import { ItemsRequestError } from './error'

import { isArr } from 'jsutils'

/**
 * For the category, inserts the item (identified by key) if it doesn't exist, otherwise updates it.
 * @param {Object} state - redux store state
 * @param {Object} action - an action of the form { type, payload: { category, key, item }}
 * @returns the next state, with the item inserted/updated
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const upsertItem = (state, action) => {
  const { category, key, item } = action.payload

  const { isValid, issues } = isValidItemRequest(state, category, key, item)
  if (!isValid) {
    const err = new ItemsRequestError(issues)
    return handleInvalidRequest(state, category, err)
  }

  return {
    ...state,
    [category]:
      key === undefined
        ? isArr(state[category])
            ? [ ...state[category], item ]
            : { ...state[category], ...item }
        : updateCollection(state[category], key, item),
  }
}

/**
 * Returns a new collection with all the same type and elements as coll, but with the new key-item pair. If coll
 * is an array, key is expected to be an index
 * @param {Object | Array} coll
 * @param {*} key
 * @param {*} item
 */
const updateCollection = (coll, key, item) => {
  const next = isArr(coll) ? [...coll] : { ...coll }
  next[key] = item
  return next
}
