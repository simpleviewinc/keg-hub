import { deepMerge } from 'jsutils'
import { tapState as state } from 'SVReducers/initialStates/tap'

export const tapState = deepMerge(
  {
    initialized: false,
  },
  state
)
