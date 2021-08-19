import { deepMerge } from '@keg-hub/jsutils'
import { tapState as state } from 'KegReducers/initialStates/tap'

export const tapState = deepMerge(
  {
    initialized: false,
  },
  state
)
