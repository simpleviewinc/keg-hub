const path = require('path')
const { deepFreeze } = require('jsutils')
const { loadENV } = require('KegFileSys/env')
const cliRootDir = path.join(__dirname, '../../../')

module.exports = deepFreeze({
  MACHINE: loadENV(path.join(cliRootDir, 'configs/docker-keg.env'))
})