const { Logger } = require('KegLog')
const { get } = require('jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

const throwNoConfigPath = (globalConfig, pathName) => {
  
  Logger.error(`\n Global config path '${pathName}' does on exist in the paths config!`)

  Logger.empty()

  Logger.cyan(`Global Config Paths:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.CLI_PATHS }`))

  Logger.empty()

  throw new Error(`Task failed!`)

}

module.exports = {
  throwNoConfigPath
}