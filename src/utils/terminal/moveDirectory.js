const { get } = require('jsutils')
const { getCliPrefix } = require('./getCliPrefix')

const moveDirectory = (globalConfig, movePath) => {
  const moveTo = get(globalConfig, `keg.cli.paths.${movePath}`, movePath)
  const cmdStr = `${getCliPrefix()} cd ${moveTo}`
  process.stdout.write(cmdStr)
  process.exit(0)
}

module.exports = {
  moveDirectory
}