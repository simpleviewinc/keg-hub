import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Dispatches the action to remove an item from the store
 * @param {string} category - the category of the items store
 * @param {string} key - the identifier for the item to be removed
 */
export const removeItems = (category, key) =>
  dispatch({
    type: ActionTypes.REMOVE_ITEM,
    payload: { category, key },
  })
