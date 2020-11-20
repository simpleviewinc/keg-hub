import { hasDomAccess } from '../../helpers/hasDomAccess'

let isEnabled = false

const setDomListeners = () => {
  /**
   * Web browsers emulate mouse events (and hover states) after touch events.
   * This code infers when the currently-in-use modality supports hover
   * (including for multi-modality devices) and considers "hover" to be enabled
   * if a mouse movement occurs more than 1 second after the last touch event.
   * This threshold is long enough to account for longer delays between the
   * browser firing touch and mouse events on low-powered devices.
   */
  const HOVER_THRESHOLD_MS = 1000
  let lastTouchTimestamp = 0

  const enableHover = () => {
    if (isEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) return
    isEnabled = true
  }

  const disableHover = () => {
    lastTouchTimestamp = Date.now()
    if (isEnabled) isEnabled = false
  }

  document.addEventListener("touchstart", disableHover, true)
  document.addEventListener("touchmove", disableHover, true)
  document.addEventListener("mousemove", enableHover, true)
}

hasDomAccess() && setDomListeners()

export const isHoverEnabled = () => {
  return isEnabled
}
