import { ActionTypes } from 'KegConstants'
import { removeItem } from './removeItem'
import { upsertItem } from './upsertItem'
import { upsertItems } from './upsertItems'
import { setItem } from './setItem'
import { setItems } from './setItems'
import { itemsState } from 'KegReducers/initialStates/__kegItems'
import '../typedefs'

export const initialState = { ...itemsState }

/**
 * Reducer for items. Tap defines and initializes categories using UPSERT_ITEMS, then adds/updates using UPSERT_ITEM, and removes with REMOVE_ITEM
 * @param {Object} state - current state of store
 * @param {Action} action - action to dispatch
 */
export function items(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.UPSERT_ITEMS:
    return upsertItems(state, action)

  case ActionTypes.UPSERT_ITEM:
    return upsertItem(state, action)

  case ActionTypes.SET_ITEM:
    return setItem(state, action)

  case ActionTypes.SET_ITEMS:
    return setItems(state, action)

  case ActionTypes.REMOVE_ITEM:
    return removeItem(state, action)

  default:
    return state
  }
}
