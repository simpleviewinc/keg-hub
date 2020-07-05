const { CONTAINERS_PATH } = require('KegConst/docker')
const { copyFile } = require('KegFileSys')
const { getContainerConst } = require('../docker/getContainerConst')


const addKegCLI = async cmdContext => {
  const contextPath = getContainerConst(cmdContext, `env.context_path`)
  await copyFile(
    `${ CONTAINERS_PATH }/cmdContext`,
    `${ contextPath }/node_modules/@keg-cli/container`
  )
}


module.exports = {
  addKegCLI
}