import { getWindow } from './getWindow'

/**
 * @returns {Boolean} true if this react app is in a web environment and also rendered inside of an iframe
 */
export const isIframe = () => {
  const win = getWindow()
  return win
    ? win !== win.parent
    : false
}