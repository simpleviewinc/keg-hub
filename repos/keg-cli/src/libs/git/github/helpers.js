const { Logger } = require('KegLog')
const { getGlobalConfig } = require('KegUtils/globalConfig/getGlobalConfig')
const { checkCall } = require('@svkeg/jsutils')

/**
 * Called on failed ghCli call
 * @function
 * @param {Object} response - response from the ghCli call
 *
 * @returns {*}
 */
const cliError = () => {
  
}

/**
 * Called on successful ghCli call
 * @function
 * @param {Object} response - response from the ghCli call
 *
 * @returns {*}
 */
const cliSuccess = () => {
  
}

/**
 * Injects the Keg-CLI globalConfig in the passed in arguments
 * @function
 * @param {function} method - Method to inject the globalConfig into
 *
 * @returns {*} - Response of the passed in method
 */
const injectGlobalConfig = method => (...args) => checkCall(method, getGlobalConfig(), ...args)

module.exports = {
  cliError,
  cliSuccess,
  injectGlobalConfig
}