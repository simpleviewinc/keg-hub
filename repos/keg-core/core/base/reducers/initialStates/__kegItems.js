import { deepMerge } from 'jsutils'
import { itemsState as state } from 'SVReducers/initialStates/items'

export const itemsState = deepMerge(
  {
    error: null,
  },
  state
)
