const { DOCKER } = require('KegConst/docker')
const { get } = require('jsutils')
const { executeCmd } = require('KegProc')
const { generalError } = require('KegUtils/error')

/*
 * Sets up the docker-machine env
 * Same as running eval "$(docker-machine env ${ get(DOCKER, `MACHINE.NAME`) })"
 *
 * @returns {string} - ENVs for docker machine
*/
const  getDockerMachineEnv = async () => {
  const { error, data, exitCode } = await executeCmd(
    `docker-machine env ${ get(DOCKER, `MACHINE.NAME`) }`
  )
  error && generalError(error)

  return data.split('\n')
    .reduce((config, item) => {
      if(item.indexOf('export') !== 0) return config

      const dockerEnv = item.replace('export', '').trim()
      const envSplit = dockerEnv.split('=')
      config.env[envSplit[0]] = envSplit[1]

      return config
    }, { env: {} })

}

module.exports = {
  getDockerMachineEnv
}