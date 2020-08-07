const {
  exists,
  isArr,
} = require('@ltipton/jsutils')
const { getArgValue } = require('./getArgValue')
const { removeOption } = require('../options/removeOption')

/**
 * Finds the value to the passed in keg argument
 * @function
 * @param {*} { key, meta={}, ...params }
 * @param {Object} args - Contains the data to be searched
 * @param {Array} args.options - items passed from the command line
 * @param {Object} args.task - Task Model of current task being run
 * @param {Array} args.key - Name the argument to find
 * @param {string} args.meta - Info about the argument from the task
 *
 * @returns {*} - Value of the search for argument from passed in options
 */
const findArg = ({ key, meta={}, index, task, ...args }) => {

  const value = getArgValue({
    ...args,
    long: key,
    short: key[0],
    alias: meta.alias,
    optionSchemas: task.options
  })

  // If value exists or if there's not any allowed, then return it
  if (exists(value) || !isArr(meta.allowed)) return value

  // Otherwise loop the allowed and check if one exists in the options array
  // If a allowed if found, it will be used as the value for the argument key
  const allowedMatch = meta.allowed.reduce((foundVal, allowed) => {
    return exists(foundVal)
      ? foundVal
      // The index of the found allowed option must match the index of the key
      // In the tasks options object
      : args.options.indexOf(allowed) === index
        ? allowed
        : foundVal
  }, null)

  // If there's a allowed match then remove it from the options array
  args.options = allowedMatch
    ? removeOption(args.options, allowedMatch)
    : args.options

  return allowedMatch

}

module.exports = {
  findArg
}
