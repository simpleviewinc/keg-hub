import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Sets the item in the items store, overwriting an existing value if one already exists with the key
 * @param {string} category - the category of the items store
 * @param {string} key - the identifier for the item to be removed
 * @param {*} item - the value to set by the key in the category
 */
export const setItem = (category, key, item) =>
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: { category, key, item },
  })
