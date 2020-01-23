import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const initAppAction = () => {
  dispatch({
    type: ActionTypes.APP_INIT,
    initialized: true,
  })
}
