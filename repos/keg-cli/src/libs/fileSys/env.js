const path = require('path')
const { isArr, isStrBool, toBool } = require('@keg-hub/jsutils')
const { KEY_VAL_MATCH, NEWLINE, NEWLINES_MATCH, NEWLINES_ESC } = require('KegConst/patterns')
const { parseTemplate } = require('./parseTemplate')
const { pathExistsSync, readFileSync } = require('./fileSys')

// Holds past parsed files so we don't re-parse them
const parseENVCache = {}

/**
 * Parse each line into an array to extract the key value pair
 * @function
 * @param {string} line - Single line from the loaded env file
 *
 * @returns {Array} - Parse key/value pair
 */
const getParsedEntry = line => {
  // Check if line is valid key=value pair that can be split into an array
  const keyValueArr = line.match(KEY_VAL_MATCH)

  // Return the parsed array content if it's valid
  return isArr(keyValueArr) && keyValueArr.length && keyValueArr
}

/**
 * Parses the value, by removing quoats and checking for string bools
 * @function
 * @param {string} value - Value to be parsed
 *
 * @returns {string|Array|boolean} - Parse .env file content
 */
const parseValue = toParse => {
  let value = toParse

  // Get the last char of the value
  const end = value.length - 1
  const isDoubleQuoted = value[0] === '"' && value[end] === '"'
  const isSingleQuoted = value[0] === "'" && value[end] === "'"

  // Check if it has quoates, and if so remove them out of the value
  value = (isSingleQuoted || isDoubleQuoted)
    ? value.substring(1, end).trim().replace(NEWLINES_ESC, NEWLINE)
    : value.trim()

  // Check if it's a string boolean and convert or just return the value
  return isStrBool(value) ? toBool(value) : value

}

/**
 * Parse .env file converts the content into an object
 * @function
 * @param {string} src - Source .env content to parse
 *
 * @returns {Object} - Parse .env file content
 */
const parseContent = ({ file, fill=true, data }) => {

  // Parse the env file as a template to replace any template strings
  // Or just load the text content
  const content = fill
    ? parseTemplate({ filePath: file, data })
    : readFileSync(file)

    // Split each line to isolate the keg value pair
    return content && content.split(NEWLINES_MATCH)
      // Loop over each line an parse the key value pair
      .reduce((obj, line, idx) => {

        // Check if line is valid key=value pair that can be split into an array
        const parsed = getParsedEntry(line)
        if(!parsed) return obj

        // Add the key to the object and parse the value
        obj[ parsed[1] ] = fill
          ? parseValue(parsed[2] || '')
          : parsed[2]

        return obj
      }, {}) || {}
}

/**
 * Loads a .env file from path, and calls the parseContent method on it
 * @function
 * @param {string} envPath - Path to the .env file to parse
 * @param {string} [encoding='utf8'] - File encoding of the .env file
 *
 * @returns {Object} - response from the parseContent method
 */
const loadENV = ({ envPath, encoding='utf8', data }) => {
  // If the file has not been parsed already, load it and parse it
  !parseENVCache[envPath] &&
    ( parseENVCache[envPath] = parseContent({
      data,
      fill: true,
      file: envPath,
    }))

  // Return the parsed data
  return parseENVCache[envPath]
}

  // Try to load the file if it exists
/**
 * Checks if an env file exists first the tries to load it
 * @function
 * @param {string} envPath - Path to the .env file to parse
 *
 * @returns {Object} - response from the loadENV method || empty object
 */
const checkLoadEnv = (envPath, data) => {
  return pathExistsSync(envPath) ? loadENV({ envPath, data }) : {}
}

module.exports = {
  parseContent,
  checkLoadEnv,
  loadENV,
}
