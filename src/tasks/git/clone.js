const { DOCKER } = require('KegConst/docker')
const { Logger } = require('KegLog')
const { throwRequired } = require('KegUtils/error/throwRequired')
/**
 * Git clone task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitClone = args => {
  const { params, globalConfig, task } = args
  const { context, remote, location, tap } = params

  // Enforce the required params
  !context && !remote && !location && throwRequired(
    task,
    `context' or 'remote' && 'location`,
    task.options.context
  )

  // TODO: Use the context || remote && location to clone a repo locally
  Logger.spacedMsg(` Task "${task.name}" not yet implemented!`)

}

module.exports = {
  clone: {
    name: 'clone',
    action: gitClone,
    description: "Clones a repo from a remote to the local machine",
    example: 'keg clone <options>',
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: "Context or name of the repo to clone",
        example: 'keg clone context=<name of repo>',
        enforced: true,
      },
      remote: {
        description: "Remote url of the repo to clone",
        example: 'keg clone remove=<url of repo> location=<local clone location>',
        enforced: true,
      },
      location: {
        alias: [ 'loc' ],
        description: "Location on the local machine to where the repo should be cloned",
        example: 'keg clone remove=<url of repo> location=<local clone location>',
        enforced: true,
      },
      tap: {
        description: 'It passed wil auto-link the cloned repo to the keg-cli. Same as running "keg tap link"',
        example: 'keg clone --tap',
        default: false,
      }
    }
  }
}
