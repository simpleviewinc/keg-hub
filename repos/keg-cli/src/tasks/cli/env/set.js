const { addDefaultEnv } = require('KegUtils/defaultEnvs/addDefaultEnv')
const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { generalError } = require('KegUtils/error/generalError')

/**
 * Gets the key and value from the params or first passed in option
 * @function
 * @param {Object} params - Parse passed in arguments
 * @param {Object} options - Original un-parsed passed in arguments
 *
 * @returns {Object} - Contains the key and value pair
 */
const getEnv = (params, options) => {

  if((params.key && params.value ) || !options[0] || !options[0].includes('=')) return params

  const [ key, value ] = options[0].split('=')
  return key && value ? { key, value } : generalError(`A key and value are required to set an ENV`)

}

/**
 * Adds a global env to the global defaults file
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const setEnv = async args => {
  const { params, options } = args
  const { force, confirm } = params
  const { key, value } = getEnv(params, options)

  const addKey = key.toUpperCase()

  await confirmExec({
    force,
    execute: () => addDefaultEnv({ key: addKey, value, force: force || !confirm }),
    confirm: `Are you sure you want to add Global ENV ${addKey}?`,
    preConfirm: !confirm,
    success: `The Global ENV key ${addKey} was Added!`,
    cancel: `Set Global ENV key was canceled!`,
  })

}

module.exports = {
  set: {
    name: 'set',
    alias: [ 'add' ],
    action: setEnv,
    description: 'Set env values for the Global Keg-CLI env file',
    example: 'keg cli env set <key> <value> <options>',
    options: {
      shorthand: {
        description: 'Allows setting the environment variable by shorthand',
        example: 'keg cli env set MY_ENV=my_value',
        enforce: true,
        type: 'array'
      },
      key: {
        description: 'Key of the environment variable. Will be converted to all capital letters',
        example: 'keg cli env set key=MY_ENV',
        enforce: true,
      },
      value: {
        alias: [ 'val' ],
        description: 'Value of the environment variable',
        example: 'keg cli env set value=my_value',
        enforce: true,
      },
      confirm: {
        description: "Confirm overwriting existing values.",
        example: 'keg cli env set key=MY_VALUE value=my_value --confirm false',
        default: true
      },
      force: {
        description: "Force overwriting existing values, without asking for confirmation.",
        example: 'keg cli env set key=MY_VALUE value=my_value --force',
        default: false
      }
    },
  }
}
