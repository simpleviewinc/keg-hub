const { deepMerge } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { getConfigPath } = require('KegUtils')


const storybook = async args => {
  const { command, options, tasks, globalConfig } = args

  await spawnCmd('yarn storybook', getConfigPath(globalConfig, 'components'))

}

module.exports = {
  name: 'storybook',
  alias: [ 'sb' ],
  action: storybook,
  description: `Run storybook in development mode`,
  example: 'keg component storybook <options>'
}