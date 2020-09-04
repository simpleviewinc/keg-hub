const { get } = require('@keg-hub/jsutils')
const { pathExistsSync } = require('KegFileSys')
const { fillTemplate } = require('../template')
const { throwNoFileExists } = require('../error/throwNoFileExists')
const {
  GIT_SSH_COMMAND,
  GIT_SSH_KEY,
  GIT_SSH_PARAMS,
  GIT_SSH_KEY_PATH,
  GLOBAL_CONFIG_PATHS
} = require('KegConst/constants')

/**
 * Tries to load a git ssh key from the save globalConfig path, or the default
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} - git ssh key path as a ssh argument with -i
 */
const getSSHKey = globalConfig => {
  const sshKeyPath = get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.sshKey`, GIT_SSH_KEY_PATH)
  const keyExists = pathExistsSync(sshKeyPath)
  
  return keyExists
    ? fillTemplate({
        template: GIT_SSH_KEY,
        data: { GIT_SSH_KEY: sshKeyPath }
      })
    : ''
}

/**
 * Builds the GIT_SSH_COMMAND env for git commands
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} - Built ssh command string for git commands
 */
const buildGitSSH = globalConfig => {
  const sshKey = globalConfig ? getSSHKey(globalConfig) : ''

  return [ GIT_SSH_COMMAND, sshKey, ...GIT_SSH_PARAMS ]
    .reduce((cmd, val) => (val ? cmd += ` ${val}` : cmd), '')
}

module.exports = {
  buildGitSSH
}