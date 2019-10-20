/** @module dimensions */

import { hasDomAccess, addListener, getWindow } from '../utils'
import { debounce, isArr, isFunc } from 'jsutils'
import { Constants } from '../constants'

const DEBOUNCE_RATE = 100
const domAccess = hasDomAccess()
const winDim = getWindow()


const setScreen = win => {
  return {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width
  }
}
const setWin = win => {
  return {
    fontScale: 1,
    height: win.innerHeight,
    scale: win.devicePixelRatio || 1,
    width: win.innerWidth
  }
}

const dimensions = { window: setWin(winDim), screen: setScreen(winDim) }

const listeners = {}

const get = (dimension) => (dimensions[dimension])

const set = ({ screen, window: win }) => {
  if(screen) dimensions.screen = screen
  if(win) dimensions.window = win
}

const update = () => {
  dimensions.window = setWin(winDim)
  dimensions.screen = setScreen(winDim)

  isArr(listeners[Constants.CHANGE_EVENT]) &&
    listeners[Constants.CHANGE_EVENT].forEach(listener => listener(dimensions))
}

const addEventListener = (type, listener) => {
  if(!type || !isFunc(listener)) return

  listeners[type] = listeners[type] || []
  listeners[type].push(listener)
}

const removeEventListener = (type, removeListener) => {
  type &&
    isFunc(removeListener) &&
    isArr(listeners[type]) &&
    (listeners[type] = listeners[type].filter(listener => listener !== removeListener))
}

domAccess && addListener(window, Constants.RESIZE_EVENT, debounce(update, DEBOUNCE_RATE))

export const Dimensions = {
  get,
  set,
  update,
  addEventListener,
  removeEventListener
}
