const path = require('path')
const { deepFreeze } = require('jsutils')
const { cliRootDir } = require('./values')
const { loadENV } = require('KegFileSys/env')

/*
 * Builds the docker machine config
 *
 * @returns {Object} - Built machine config
*/
module.exports = deepFreeze({
  MACHINE: loadENV(path.join(cliRootDir, 'configs/docker-keg.env'))
})