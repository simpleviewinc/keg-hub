import { navigateToPath } from 'SVNavigation/navigateToPath'
import { logData } from 'jsutils'
import { getHistory } from 'SVNavigation/history'

/**
 * Called when you want to navigate to another route path
 * @param {String} path - path you want to route to
 * 
 * @returns {void}
 */
export const navigateTo = (path) => {

  const { success, message } = navigateToPath(path, getHistory())

  if (!success)
    logData(message, 'warn') 
}