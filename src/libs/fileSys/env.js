const fs = require('fs')
const path = require('path')
const { isArr } = require('jsutils')

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/

/**
 * Parse .env file converts the content into an object
 * @function
 * @param {string} src - Source .env content to parse
 *
 * @returns {Object} - Parse .env file content
 */
const parseContent = src => {
  return src.toString()
    .split(NEWLINES_MATCH)
    .reduce((obj, line, idx) => {
      const keyValueArr = line.match(RE_INI_KEY_VAL)
      if(!isArr(keyValueArr) || !keyValueArr.length) return obj

      const key = keyValueArr[1]
      let val = (keyValueArr[2] || '')

      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      obj[key] = isSingleQuoted || isDoubleQuoted
        ? (() => {
            val = val.substring(1, end)
            return isDoubleQuoted ? val.replace(RE_NEWLINES, NEWLINE) : val
          })()
        : (val = val.trim())

      return obj
    }, {})

}

/**
 * Loads a .env file from path, and calls the parseContent method on it
 * @function
 * @param {string} envPath - Path to the .env file to parse
 * @param {string} [encoding='utf8'] - File encoding of the .env file
 *
 * @returns {Object} - response from the parseContent method
 */
const loadENV = (envPath, encoding='utf8') => {
  return parseContent(fs.readFileSync(envPath, { encoding }))
}

module.exports = {
  loadENV
}
