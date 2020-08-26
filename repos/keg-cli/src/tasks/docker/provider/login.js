const { spawnCmd } = require('KegProc')
const { buildDockerLogin } = require('KegUtils/builders/buildDockerLogin')
const docker = require('KegDocCli')

/**
 * Logs into a configured docker registry provider
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - Current task being run
 * @param {Object} args.params - Formatted key / value pair of the passed in options
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const providerLogin = async args => {

  const creds = await buildDockerLogin(args.params)
  await docker.login(creds)

}

module.exports = {
  login: {
    name: 'login',
    alias: [ 'lgn', 'lg' ],
    action: providerLogin,
    description: 'Log into the Docker registry provider',
    example: 'keg docker provider login <options>',
    options: {
      user: {
        description: 'User to use when logging into the registry provider',
        example: 'keg docker provider login --user foobar',
        enforced: true
      },
      provider: {
        description: 'Url of the docker registry provider',
        example: 'keg docker provider login --provider docker.pkg.github.com',
        enforced: true
      },
      token: {
        description: 'API Token for registry provider to allow logging in',
        example: 'keg docker provider login --token 12345',
        enforced: true
      },
    }
  }
}