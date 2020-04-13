const {
  addGlobalConfigProp,
  confirmExec,
  getArguments,
  getGitKey,
  gitKeyExists,
  removeGlobalConfigProp,
  throwRequired
} = require('KegUtils')
const { encrypt } = require('KegCrypto')
const { ask } = require('KegQuestions')
const {GLOBAL_CONFIG_PATHS } = require('KegConst')

/**
 * Encrypts then adds a git key to the global config.
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} value - Value of the git key
 *
 * @returns {void}
 */
const addGitKey = (globalConfig, value, task) => {

  // Ensure we have a value for the git key, or throw error
  if(!value) throwRequired(task, key, meta.options.value)

  confirmExec({
    confirm: `Overwrite current git key in global config?`,
    success: `Set git key in global config!`,
    cancel: `Set git key in global config cancelled!`,
    preConfirm: !Boolean(gitKeyExists(globalConfig)),
    execute: () => addGlobalConfigProp(
      globalConfig,
      `${GLOBAL_CONFIG_PATHS.GIT}.key`,
      // Encrypt the value before saving,
      // So at least not saving in plain text
      encrypt(value)
    ),
  })

}

/**
 * Removes the git key from the global config cli
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const removeGitKey = (globalConfig, value) => {
  confirmExec({
    confirm: `Remove git key from global config?`,
    success: `Removed git key from global config!`,
    cancel: `Remove git key from global config cancelled!`,
    preConfirm: !Boolean(gitKeyExists(globalConfig)),
    execute: () => removeGlobalConfigProp(
      globalConfig,
      `${GLOBAL_CONFIG_PATHS.GIT}.key`
    ),
  })
}

/**
 * Git key tasks
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitKey = args => {
  const { globalConfig } = args
  const { action, value } = getArguments(args)
  
  switch(action){
    case 'add': return addGitKey(globalConfig, value)
    case 'remove': return removeGitKey(globalConfig, value)
  }

}

module.exports = {
  name: 'key',
  action: gitKey,
  description: `Updates github key in the global config`,
  example: 'keg git key <options>',
  options: {
    action: {
      allowed: [ 'add', 'remove' ],
      description: "Action to perform on the git key",
      example: 'key git key remove',
      required: true
    },
    value: {
      description: 'Git key to access repos from a git provider ( github )',
      example: 'key git key add value=<Git Key Value>'
    }
  }
}