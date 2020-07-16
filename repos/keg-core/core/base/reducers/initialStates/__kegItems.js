import { deepMerge } from '@ltipton/jsutils'
import { itemsState as state } from 'SVReducers/initialStates/items'

export const itemsState = deepMerge(
  {
    error: null,
  },
  state
)
