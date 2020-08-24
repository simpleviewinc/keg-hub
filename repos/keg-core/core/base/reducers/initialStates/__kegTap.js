import { deepMerge } from '@svkeg/jsutils'
import { tapState as state } from 'SVReducers/initialStates/tap'

export const tapState = deepMerge(
  {
    initialized: false,
  },
  state
)
