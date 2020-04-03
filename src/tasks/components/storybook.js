const { deepMerge } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { getConfigPath } = require('KegUtils')

// Need to update spawn-cmd repo to not require these
const onError = (error) => {}
const onStdErr = (error) => {}
const onExit = (exit) => {}

const config = {
  onError,
  onStdErr,
  onExit,
}

const storybook = async args => {
  const { command, options, tasks, globalConfig } = args

  await spawnCmd(
    'yarn',
    deepMerge(config, {
      args: [ 'storybook' ],
      options: { cwd: getConfigPath(globalConfig, 'components') }
    })
  )

}

module.exports = {
  name: 'storybook',
  alias: [ 'sb' ],
  action: storybook,
  description: `Run storybook in development mode`,
  example: 'keg component storybook <options>'
}