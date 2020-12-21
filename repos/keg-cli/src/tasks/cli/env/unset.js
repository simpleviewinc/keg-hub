const { removeDefaultEnv } = require('KegUtils/defaultEnvs/removeDefaultEnv')
const { confirmExec } = require('KegUtils/helpers/confirmExec')

/**
 * Removes a global env from the global defaults file
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const unsetEnv = async args => {

  const { params: { force, key, confirm, comment }} = args

  await confirmExec({
    force,
    execute: () => removeDefaultEnv({ key, comment, force }),
    confirm: `Are you sure you want to remove Global ENV ${key}?`,
    preConfirm: !confirm,
    success: `The Global ENV key ${key} was removed!`,
    cancel: `Unset Global ENV key was canceled!`,
  })

}

module.exports = {
  unset: {
    name: 'unset',
    alias: [ 'remove', 'delete' ],
    action: unsetEnv,
    description: 'Remove env value from the Global Keg-CLI env file',
    example: 'keg cli env unset <key>',
    options: {
      key: {
        description: 'Key of the environment variable. Will be converted to all capital letters',
        example: 'keg cli env unset key=MY_ENV',
        required: true,
      },
      confirm: {
        description: 'Confirm before setting the value.',
        example: 'keg cli env unset --confirm false',
        default: true,
      },
      comment: {
        description: 'Turn ENV into comment instead of fully removing',
        example: 'keg cli env unset --comment false',
        default: true,
      },
      force: {
        description: "Force overwriting existing values, without asking for confirmation.",
        example: 'keg cli env set key=MY_VALUE value=my_value --force',
        default: false
      }
    },
  }
}
