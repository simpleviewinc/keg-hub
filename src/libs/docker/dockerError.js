

/**
 * Throws a error with a message about a docker command
 * @param {string} message - Message about docker error
 *
 * @returns {void}
 */
const dockerError = (message, cmd) => {
  const docMessage = `Can not run docker command ${ cmd ? ' => ' + cmd : '' }`
  throw new Error(`${docMessage}. ${message}`)
}