'use strict'

/**
 * Convert JSON string into object, wrapped in a try / catch
 * @param  { string } string
 * @return { object } - JSON object
 */
const parseJSONString = str => {
  try {
    return JSON.parse(str)
  }
  catch (e){
    console.error(e.message)
    return null
  }
}
/**
 * Converts first letter of a string to be capitalized
 * @param  { string } string
 * @return { string } - Passed in string, but capitalized
 */
const capitalize = str => (
  isStr(str) && `${str[0].toUpperCase()}${str.slice(1)}` || str
)
/**
 * Check if data is a string
 * @param  { string } string
 * @return { boolean } - if it's a string
 */
const isStr = str => typeof str === 'string'
/**
 * Cleans a string
 * @param  { string } string
 * @return { string } - cleaned string
 */
const sanitizeString = str => isStr(str) &&  str.replace(/[\u2028-\u2029]/g, '') || str
/**
 * Trims objects string fields
 * @param  { object } object
 * @return { object } - object with string fields trimmed
 */
const trimObjectStringFields = object => (
  Object
    .entries(object)
    .reduce((cleaned, [ key, value ]) => {
      cleaned[key] = typeof value === 'string' ? value.trim() : value
      return cleaned
    }, object)
)
/**
 * Converts a string to train case
 * @param  { object } string to be converted
 * @return { object } - string wit spaces converted to lodash and all lowercase
 */
const sanitizeCopyObject = object => JSON.parse(sanitizeString(JSON.stringify(object)))
/**
 * Converts a string to train case
 * @param  { string } string to be converted
 * @return { string } - string wit spaces converted to lodash and all lowercase
 */
const toTrainCase = str => isStr(str) && str.replace(/ /g, '-').toLowerCase() || str

module.exports = {
  capitalize,
  isStr,
  parseJSONString,
  sanitizeCopyObject,
  sanitizeString,
  toTrainCase,
  trimObjectStringFields
}
