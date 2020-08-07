import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const initAppAction = async () => {
  dispatch({
    type: ActionTypes.APP_INIT,
    initialized: true,
  })
}
