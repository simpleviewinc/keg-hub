const { ask } = require('../askIt')
const { Logger } = require('../logger')
const { validate, isArr, isStr } = require('@keg-hub/jsutils')

/**
 * Helper that prompts the user to select an option from a list.
 * @param {Array<string>} options - list of options
 * @param {string} title - Title printed above options list
 * @param {string} selectText - Text printed before user input
 *
 * @return {Promise<number>} the index of the selected option. Returns -1 if input failed validation
 */
const promptList = async (options, title='Options:', selectText='Choose an option') => {

  const [ valid ] = validate({ options, title, selectText }, 
    { 
      options: opts => isArr(opts) && opts.length, 
      $default: isStr 
    }
  )
  if (!valid) return -1

  let awaitingValidInput = true
  let index = NaN

  while (awaitingValidInput) {

    // print out the available options
    Logger.print('\n' + Logger.color('green', title))
    options.map(
      (option, idx) => Logger.print(`  ${idx} => ${option}`)
    )

    // prompt user to choose an index
    const input = await ask.input(Logger.color('yellow', selectText))

    // parse the input and validate it
    index = parseInt(input)
    awaitingValidInput = (isNaN(input) || index < 0 || index >= options.length)
    awaitingValidInput && Logger.warn('\nInvalid input. Please enter an index from the range listed.\n')
  }

  return index
}

/**
 * Set promptList directly on ask object so we can use it where ever ask is required
 */
ask.promptList = promptList

module.exports = { promptList }