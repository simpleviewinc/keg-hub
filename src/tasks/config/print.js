
/**
 * Prints the CLI global config object to the terminal
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const printConfig = args => {
  const { globalConfig } = args

  console.log(JSON.stringify(globalConfig, null, 2))

}

module.exports = {
  print: {
    name: 'print',
    action: printConfig,
    description: `Print the global config to the terminal`,
    example: 'keg config print'
  }
}