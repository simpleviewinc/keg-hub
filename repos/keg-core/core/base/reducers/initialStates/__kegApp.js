import { deepMerge } from '@keg-hub/jsutils'
import { appState as state } from 'KegReducers/initialStates/app'

export const appState = deepMerge(
  {
    initialized: false,
  },
  state
)
