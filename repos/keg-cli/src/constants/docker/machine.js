const path = require('path')
const { deepFreeze, reduceObj } = require('@keg-hub/jsutils')
const { cliRootDir } = require('./values')
const { loadENV } = require('KegFileSys/env')

const envType = process.env.KEG_NO_MACHINE
  ? `desktop`
  : `machine`

// Load the docker-machine ENVs from same file as setup script
const machineEnvs = loadENV({
  envPath: path.join(cliRootDir, `scripts/docker/docker-${envType}.env`),
})

/*
 * Builds the docker machine config
 *
 * @returns {Object} - Built machine config
*/
module.exports = deepFreeze({
  PREFIXED: machineEnvs,
  // Use the same ENV file as the setup script, but remove the KEG_DOCKER_ prefix
  MACHINE: reduceObj(machineEnvs, (key, value, cleaned) => {
    cleaned[key.replace('KEG_DOCKER_', '')] = value

    return cleaned
  }, {})
})