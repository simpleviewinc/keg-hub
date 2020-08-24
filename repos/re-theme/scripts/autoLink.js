const path = require('path')
const { asyncCmd } = require('@svkeg/spawn-cmd')
const tapRoot = path.join(__dirname, '..')
const { KEG_CLI_PATH } = process.env

/**
 * Auto-links to the keg-cli - i.e. `keg tap link retheme`
 *
 * @returns {void}
 */
const autoLink = async () => {
  if (!KEG_CLI_PATH) return

  // Get the path to the keg-cli file
  const cliFile = path.join(KEG_CLI_PATH, 'keg-cli')

  // Try to auto-link the tap to the keg-cli
  const { data, exitCode } = await asyncCmd(
    `node ${cliFile} tap link --name retheme --silent`,
    tapRoot
  )

  exitCode === 0 && console.log(data)
}

module.exports = {
  autoLink,
}
