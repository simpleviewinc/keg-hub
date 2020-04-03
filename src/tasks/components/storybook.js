const { deepMerge } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { getConfigPath } = require('KegUtils')

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
    getConfigPath(globalConfig, 'components')
  )

}

module.exports = {
  name: 'storybook',
  alias: [ 'sb' ],
  action: storybook,
  description: `Run storybook in development mode`,
  example: 'keg component storybook <options>',
  options: {
    [`default (No Options Passed)`]: 'Run keg-components storybook in a development environment',
    build: 'Build storybook for the keg-components',
    deploy: 'Deploy to the keg-components storybook website',
    native: 'Run storybook in a native context',
  }
}