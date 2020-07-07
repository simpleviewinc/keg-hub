import { isValidUpsertItemRequest, handleInvalidRequest } from './errorHandler'
import { ItemsRequestError } from './error'
import { isArr, isObj, deepMerge } from 'jsutils'
import '../typedefs'

/**
 * For the category, inserts `item` (identified by `key`) if it doesn't exist, otherwise updates it.
 * If a key-item pair already exists, it will be merged with `item`.
 * @param {Object} state - redux store state
 * @param {Action} action - an action of the form { type, payload: { category, key, item }}
 * @returns the next state, with the item inserted/updated
 *
 * Will set the error object in the category of the nextState if the request is Invalid.
 * @see isValidItemRequest for the causes of an invalid request.
 */
export const upsertItem = (state, action) => {
  const { category, key, item } = action.payload

  const { isValid, issues } = isValidUpsertItemRequest(
    state,
    category,
    key,
    item
  )
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
  const nextCollection = isArr(coll) ? [...coll] : { ...coll }

  const existingItem = nextCollection[key]

  // if item is an object, then merge with the existing item
  // to preserve properties not included in `item`
  nextCollection[key] = isObj(item)
    ? deepMerge(existingItem, item)
    : isArr(item)
      ? item.concat(existingItem || [])
      : item

  return nextCollection
}
