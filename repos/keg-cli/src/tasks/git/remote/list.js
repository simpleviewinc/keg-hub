const { Logger } = require('KegLog')

/**
 * Prints the remotes for a repo
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const remoteList =  async args => {
  console.log(`---------- Remote list ----------`)
  const { params } = args
  const { remote, url } = params

}

module.exports = {
  list: {
    name: 'list',
    alias: [ 'ls' ],
    action: remoteList,
    description: 'List remotes for a repo',
    example: 'keg git remote list <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the repo to log, may also be a linked tap',
        example: 'keg git remote list context=core',
      },
      location: {
        alias: [ 'loc' ],
        description: `Location where the git log command will be run. Use when context option is "undefined"`,
        example: 'keg git remote list location=<path/to/git/repo>',
        default: process.cwd()
      },
    }
  }
}