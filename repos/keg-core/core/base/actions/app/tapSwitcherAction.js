import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { nativeService } from 'SVServices'
import { reloadAppAction } from 'SVActions'

export const tapSwitcherAction = async tap => {
  // Update the tap on the backend
  const data = await nativeService.switchTap(tap)

  // Wait a few seconds before calling reload on the application
  setTimeout(reloadAppAction, 5000)

  dispatch({
    type: ActionTypes.SWITCHING_TAP,
    data,
  })
}
