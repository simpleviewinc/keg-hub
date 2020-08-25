const fs = require('fs')
const path = require('path')
const { get } = require('@svkeg/jsutils')
const { asyncCmd } = require('@svkeg/spawn-cmd')
const tapRoot = path.join(__dirname, '..')
const tapConfig = require(`${tapRoot}/tap.json`)
const { KEG_CLI_PATH } = process.env

const autoLink = async () => {

  if(!KEG_CLI_PATH) return

  // Get the path to the keg-cli file
  const cliFile = path.join(KEG_CLI_PATH, 'keg-cli')

  // Get the name of the linked tap
  const linkName = get(tapConfig, 'keg.cli.link.name')

  // Try to auto-link the tap to the keg-cli
  const { data, exitCode } = fs.existsSync(cliFile) && linkName &&
    await asyncCmd(`node ${ cliFile } tap link ${ linkName }`, tapRoot)

  exitCode === 0 && console.log(data)

}

module.exports = {
  autoLink
}
