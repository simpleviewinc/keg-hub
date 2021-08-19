import { ActionTypes } from 'KegConstants'
import { appState } from 'KegReducers/initialStates/__kegApp'

const initialState = { ...appState }

export function app(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.APP_INIT: {
    return {
      ...state,
      initialized: true,
    }
  }
  default: {
    return state
  }
  }
}
