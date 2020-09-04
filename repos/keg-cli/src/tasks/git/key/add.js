const {
  addGlobalConfigProp,
  confirmExec,
  gitKeyExists,
} = require('KegUtils')
const { throwRequired } = require('KegUtils/error')
const { getSetting } = require('KegUtils/globalConfig')
const { encrypt } = require('KegCrypto')
const { ask } = require('@keg-hub/ask-it')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

/**
 * Encrypts then adds a git key to the global config.
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} value - Value of the git key
 *
 * @returns {void}
 */
const addGitKey = (args) => {
  const { globalConfig, params, task } = args
  const { value } = params

  // Ensure we have a value for the git key, or throw error
  if(!value) throwRequired(task, key, task.options.value)

  confirmExec({
    confirm: `Overwrite current git key in global config?`,
    success: `Set git key in global config!`,
    cancel: `Set git key in global config cancelled!`,
    preConfirm: !Boolean(gitKeyExists(globalConfig)),
    execute: async () => {
      const password = getSetting(`git.secure`)
        ? await ask.password('Please enter a password')
        : false

      addGlobalConfigProp(
        globalConfig,
        `${GLOBAL_CONFIG_PATHS.GIT}.key`,
        // Encrypt the value before saving,
        // So at least not saving in plain text
        encrypt(value, password)
      )
    }
  })

}

module.exports = {
  add: {
    name: 'add',
    action: addGitKey,
    description: `Adds a github key to the global config`,
    example: 'keg git key add <options>',
    options: {
      value: {
        alias: [ 'val' ],
        description: 'Git key to access repos from a git provider ( github )',
        example: 'key git key add value=<Git Key Value>',
        required: true
      }
    }
  }
}
