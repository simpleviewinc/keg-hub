const {
  addGlobalConfigProp,
  confirmExec,
  getGitKey,
  gitKeyExists,
  removeGlobalConfigProp,
} = require('KegUtils')
const { ask } = require('askIt')
const { get } = require('@ltipton/jsutils')
const { encrypt, decrypt } = require('KegCrypto')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')


const printGitKey = async (args) => {
  const { globalConfig, params, task } = args
  const key = await getGitKey(globalConfig)
  console.log(key)
}

module.exports = {
  print: {
    name: 'print',
    action: printGitKey,
    description: `Prints the store github key in plain text`,
    example: 'keg git key print',
  }
}