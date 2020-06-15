import { ActionTypes } from 'SVConstants'
import { removeItem } from './removeItem'
import { upsertItem } from './upsertItem'
import { upsertItems } from './upsertItems'
import { itemsState } from 'SVReducers/initialStates/__kegItems'

export const initialState = { ...itemsState }

/**
 * Reducer for items. Tap defines and initializes categories using UPSERT_ITEMS, then adds/updates using UPSERT_ITEM, and removes with REMOVE_ITEM
 */
export function items(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.UPSERT_ITEMS:
    return upsertItems(state, action)

  case ActionTypes.UPSERT_ITEM:
    return upsertItem(state, action)

  case ActionTypes.REMOVE_ITEM:
    return removeItem(state, action)

  default:
    return state
  }
}
