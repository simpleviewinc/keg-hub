

/**
 * Stop keg-core docker containers and syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pullRequest = async args => {
  const { params: { number } } = args
  console.log(`---------- params ----------`)
  console.log(params)
  
  
}


module.exports = {
  pullrequest: {
    name: 'pullrequest',
    alias: [ 'pr' ],
    action: pullRequest,
    description: `Pulls a pull request from github down locally`,
    example: 'keg core pr <options>',
    options: {
      number: {
        alias: [ 'num' ],
        description: `Pull request number.`,
        example: 'keg core pr --number 23',
      },
    },
  }
}