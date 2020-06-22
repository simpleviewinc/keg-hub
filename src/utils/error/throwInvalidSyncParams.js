const { throwInvalidParamMatch } = require('./throwInvalidParamMatch')

/**
 * Validates the passed in attached and service params for docker-sync service
 * <br/> If the attached and service params are invalid, it throws
 * @param {Object} args.attached - The service to attach to the terminal session
 * @param {Object} args.service - The service that is being run
 *
 * @returns {void}
 */
const throwInvalidSyncParams = ({ attached, service }) => {
  attached === 'sync' &&
    service !== 'sync' &&
    throwInvalidParamMatch(`Attempting to attach to "sync", but "service" is set to "${service}"`)
}


module.exports = {
  throwInvalidSyncParams
}