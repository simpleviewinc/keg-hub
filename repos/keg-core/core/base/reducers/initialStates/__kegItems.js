import { deepMerge } from '@keg-hub/jsutils'
import { itemsState as state } from 'SVReducers/initialStates/items'

export const itemsState = deepMerge(
  {
    error: null,
  },
  state
)
