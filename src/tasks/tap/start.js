const { reduceObj } = require('jsutils')
const { buildDockerCmd, getVolumeMounts, dockerError } = require('KegDocker')
const { getArgument, getTapPath } = require('KegUtils')
const { spawnCmd, executeCmd } = require('KegProc')

/*
  * What startTap method should do
    1. Start a docker container for the tap
    2. Mount the tap into the docker container at a consistent location
      * Should get hosts tap location from global config
    3. Mount keg-core into node_modules of tap
      * tap/node_modules/keg-core
      * Should get hosts keg-core location from global config
    4. Mount re-theme / tap-resolver into keg-core node_modules
      * tap/node_modules/keg-core/node_modules/*
      * Should get hosts re-theme / tap-resolver location from global config
    5. Start the expo server type based on params
      * Native || Web
    6. Expose the ports to allow host machine to access the server in the container
    
    Tap Mount
    -v ${dirs.tap}/:/keg/tap 
    Core Mount
    -v ${dirs.core}/:/keg/tap/node_modules/sv-keg
    ReTheme Mount
    -v ${reThemeDir}/:/keg/tap/node_modules/sv-keg/node_modules/re-theme
    Components Mount
    -v ${keg-components}/:/keg/tap/node_modules/sv-keg/node_modules/keg-components

*/


const startTap = async (args) => {
  const { command, options, tasks, globalConfig } = args

  const name = getArgument({ options, long: 'name', short: 'n' })
  const location = getTapPath(globalConfig, name)
  const { version } = require(`${location}/package.json`)
  
  const dockerCmd = buildDockerCmd({
    name,
    cmd: `run`,
  })

  await spawnCmd(`${dockerCmd.trim()} ${name}:${version}`, location)

}

module.exports = {
  name: 'start',
  alias: [ 'st', 'run' ],
  action: startTap,
  description: `Runs a tap in a docker container`,
  example: 'keg tap start <options>',
  options: {
    name: 'Name of the tap to run. Must be a tap linked in the cli global config',
  }
}