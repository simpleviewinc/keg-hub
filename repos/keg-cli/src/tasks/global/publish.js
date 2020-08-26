const { spawnCmd } = require('@svkeg/spawn-cmd')
const { getRepoPath } = require('KegUtils/getters/getRepoPath')
const { reduceObj, isStr, toBool, isBool } = require('@svkeg/jsutils')
const { throwNoConfigPath } = require('KegUtils/error/throwNoConfigPath')
const { checkBoolValue } = require('@svkeg/args-parse/src/options/checkBoolValue')

/**
 * NP options map - Maps keg-cli task options to np options
 * @Object
 */
const npOpts = {
  'no-auth': '--no-2fa',
  'any-branch': '--any-branch',
  branch: '--branch',
  contents: '--contents',
  'no-cleanup': '--no-cleanup',
  'no-test': '--no-tests',
  'no-publish': '--no-publish',
  'no-release': '--no-release-draft',
  preview: '--preview',
  tag: '--tag',
  yolo: '--yolo',
}

/**
 * NP options that accept a string
 * @Object
 */
const npStrOpts = [
  'any-branch',
  'branch',
  'contents',
  'tag',
]

/**
 * Mapped the passed in options to the np options
 * @function
 * @param {Object} params - Parsed passed in options in object format
 *
 * @returns {Array} - All options to pass to the np cmd
 */
const getNpOptions = params => {
  return reduceObj(params, (key, value, options) => {
    return isBool(value) && value && isStr(npOpts[key])
      ? options.concat([ npOpts[key] ])
      : isStr(value) && npStrOpts.includes(key)
        ? options.concat([ `${ npOpts[key] }=${ value }` ])
        : options
  }, [])
}

/**
 * Validate task for keg-cli
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const publishPackage = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const { context, location } = params
  
  const npArgs = getNpOptions(params)
  const contextPath = location || getRepoPath(context)

  contextPath
    ? await spawnCmd(`np`, { args: npArgs, cwd: contextPath })
    : throwNoConfigPath(globalConfig, location || context)

}

module.exports = {
  publish: {
    name: 'publish',
    alias: [ 'pub', 'np' ],
    action: publishPackage,
    description: `Validate the keg-cli is setup correctly!`,
    example: 'keg global publish',
    options: {
      context: {
        description: 'Context of name of the package to publish',
        example: 'keg global publish core',
      },
      location: {
        description: 'Location of the repo to publish, if not in paths or linked',
        example: 'keg global publish --location path/to/my/repo',
      },
      'any-branch': {
        alias: [ 'ab' ],
        description: 'Allow publishing from any branch',
        example: 'keg publish --any-branch',
        default: false,
      },
      branch: {
        alias: [ 'br', ],
        description: 'Name of the release branch (default: master)',
        example: 'keg publish --branch <branch to publish>',
      },
      'no-cleanup': {
        alias: [ 'nocl' ],
        description: 'Skips cleanup of node_modules',
        example: 'keg publish --no-cleanup',
        default: false,
      },
      'no-tests': {
        alias: [ 'nots' ],
        description: 'Skips runnign tests before publishing',
        example: 'keg publish --no-tests',
        default: false,
      },
      yolo: {
        description: 'Skips both repo cleanup and running testing before publishing',
        example: 'keg publish --yolo',
        default: false,
      },
      'no-publish': {
        alias: [ 'nopb' ],
        description: 'Skips publishing',
        example: 'keg publish --no-publish',
        default: false,
      },
      preview: {
        alias: [ 'prev' ],
        description: 'Show tasks without actually executing them',
        example: 'keg publish --preview',
        default: false,
      },
      tag: {
        description: 'Publish under a given dist-tag',
        example: 'keg publish --tag',
      },
      'no-yarn': {
        alias: [ 'noyrn' ],
        description: 'Don\'t use Yarn',
        example: 'keg publish --no-yarn',
        default: false,
      },
      contents: {
        alias: [ 'cont' ],
        description: 'Subdirectory to publish',
        example: 'keg publish --contents <path to contents>',
      },
      'no-release': {
        alias: [ 'nr' ],
        description: 'Skips opening a GitHub release draft',
        example: 'keg publish no-release',
        default: false,
      },
      'no-auth': {
        alias: [ 'no-2fa', 'no2fa', 'noath' ],
        description: 'Don\'t enable 2FA on newly published packages',
        example: 'keg publish --auth',
        default: true,
      }
    }
  }
}