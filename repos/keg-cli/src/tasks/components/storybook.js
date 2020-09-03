const { deepMerge } = require('@keg-hub/jsutils')
const { spawnCmd } = require('KegProc')
const { getPathFromConfig } = require('KegUtils')

/**
 * Runs a keg-components storybook command locally
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const storybook = async args => {
  const { command, options, tasks, globalConfig } = args
  
  const sbOpts = options.slice(1)
  const subCmd = sbOpts.shift()
  const cmdOpts = sbOpts.join(' ')

  let runCmd
  switch(subCmd){
    case 'build':
      runCmd = 'sb:build'
    break
    case 'deploy':
      runCmd = 'sb:deploy'
    break
    case 'native':
      runCmd = 'sb:native'
    break
    default:
      runCmd = 'storybook'
    break
  }

  await spawnCmd(
    `yarn ${runCmd}${ sbOpts.length ? ' ' + sbOpts.join(' ') : '' }`,
    getPathFromConfig(globalConfig, 'components')
  )

}

module.exports = {
  storybook: {
    name: 'storybook',
    alias: [ 'sb' ],
    action: storybook,
    description: `Run storybook in development mode`,
    example: 'keg component storybook <options>',
    options: {
      [`default (No Options)`]: {
        description: 'Run keg-components storybook in a development environment'
      },
      build: {
        description: 'Build storybook for the keg-components'
      },
      deploy: {
        description: 'Deploy to the keg-components storybook website'
      },
      native: {
        description: 'Run storybook in a native context'
      },
    }
  }
}