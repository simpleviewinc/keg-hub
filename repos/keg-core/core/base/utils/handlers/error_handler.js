import { logData } from '@keg-hub/jsutils'

/**
 * Helper to log out error messages
 * @param {Object} err - error to be logged out
 * @param {string} message - Extra message to print
 *
 * @return {void}
 */
export const errorHandler = (err = {}, message = '') => {
  message && logData(message, 'warn')
  err.message && logData(err.message, 'warn')
  err.stack && logData(err.stack, 'warn')
}
