const { Logger } = require('KegLog')
const { GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst')
const { confirmExec, addGlobalConfigProp } = require('KegUtils')

/**
 * Opens the CLI global config in VS Code
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const setEditor = async args => {

  const { globalConfig, options, params } = args
  const { command } = params

  confirmExec({
    execute: () => addGlobalConfigProp(globalConfig, GLOBAL_CONFIG_EDITOR_CMD, command),
    confirm: `Set open editor command to be '${ command }'`,
    success: `Set globalConfig editor success!`,
    cancel: `Set globalConfig editor canceled!`,
  })

}

module.exports = {
  editor: {
    name: 'editor',
    alias: [ 'ide' ],
    action: setEditor,
    description: `Sets the IDE used to open folders and files through the Keg-Cli.`,
    example: 'keg global editor <options>',
    options: {
      command: {
        description: 'command that is executed to open the editor!',
        example: 'keg global editor command=code',
        alias: [ 'cmd' ],
        required: true
      }
    }
  }
}